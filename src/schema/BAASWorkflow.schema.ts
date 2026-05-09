import Ajv2020 from "ajv/dist/2020"
import addFormats from "ajv-formats"

const ajv = new Ajv2020({
    allErrors: true,
    /*
        Do not open strict mode, related issues:
            https://github.com/ajv-validator/ajv/issues/1950
            https://github.com/ajv-validator/ajv/issues/1571
     */
    strict: false,
    discriminator: true,
    messages: false
})

addFormats(ajv)

export const BAASWorkflowSchema = {
    $id: "https://example.com/schemas/baas-workflow.json",
    $schema: "https://json-schema.org/draft/2020-12/schema",

    type: "object",
    required: ["metadata", "start_state", "conditions", "states", "actions"],

    properties: {
        metadata: {
            type: "object",

            properties: {
                name: {type: "string"},
                author: {type: "string"},
                description: {type: "string"},
                video_link: {type: "string"},
                battle_type: {
                    type: "string",
                    enum: ["normal", "infinite_assault"]
                },
                boss_name: {type: "string"},
                difficulty: {
                    type: "string",
                    enum: ["normal", "hard", "veryhard", "extreme", "insane", "torment", "lunatic"]
                },
                BossHealth: {
                    type: "object",
                    properties: {
                        current_ocr_region: {
                            type: "array",
                            minItems: 4,
                            maxItems: 4,
                            items: {type: "integer"} // REQUIRE_SEMANTIC_CHECK (region validation)
                        },
                        max_ocr_region: {
                            type: "array",
                            minItems: 4,
                            maxItems: 4,
                            items: {type: "integer"} // REQUIRE_SEMANTIC_CHECK (region validation)
                        },
                        ocr_region: {
                            type: "array",
                            minItems: 4,
                            maxItems: 4,
                            items: {type: "integer"} // REQUIRE_SEMANTIC_CHECK (region validation)
                        },
                        ocr_model_name: {
                            type: "string",
                            enum: ["zh-cn_v3", "zh-cn", "zh-tw", "ja-jp", "en-us", "ko-kr", "ru-ru"]
                        }
                    }
                },
                formation: {
                    type: "object",
                    properties: {
                        front: {
                            type: "array",
                            items: {type: "string"} // REQUIRE_SEMANTIC_CHECK (student name check)
                        },
                        back: {
                            type: "array",
                            items: {type: "string"} // REQUIRE_SEMANTIC_CHECK (student name check)
                        },
                        slot_count: {
                            type: "integer",
                            minimum: 0,
                            maximum: 6
                        },
                        all_appeared_skills: {
                            type: "array",
                            items: {type: "string"} // REQUIRE_SEMANTIC_CHECK (skill name check)
                        }
                    }
                },
                yolo_setting: {
                    type: "object",
                    properties: {
                        model: {
                            type: "string",
                            enum: ["best.onnx", "best_fp16.onnx"]
                        },
                        update_interval: {
                            type: "integer",
                            minimum: 0,
                            maximum: 2147483647
                        }
                    }
                }
            }
        },

        start_state: {
            type: "string" // REQUIRE_SEMANTIC_CHECK (value of states)
        },

        states: {
            type: "object",
            additionalProperties: {
                type: "object",
                properties: {
                    action: {type: "string"}, // REQUIRE_SEMANTIC_CHECK (value of actions)
                    action_fail_transition: {type: "string"}, // REQUIRE_SEMANTIC_CHECK (value of states)
                    transitions: {
                        type: "array",
                        items: {
                            type: "object",
                            required: ["condition", "next"],
                            properties: {
                                condition: {type: "string"}, // REQUIRE_SEMANTIC_CHECK (value of conditions)
                                next: {type: "string"} // REQUIRE_SEMANTIC_CHECK (value of states)
                            }
                        }
                    },
                    default_transition: {type: "string"} // REQUIRE_SEMANTIC_CHECK (value of states)
                }
            }
        },

        conditions: {
            type: "object",
            additionalProperties: {
                type: "object",
                discriminator: {propertyName: "type"},
                required: ["type"],
                properties: {
                    type: {type: "string"},
                    timeout: {
                        type: "integer",
                        minimum: 0
                    },
                    and: {
                        type: "array",
                        items: {type: "string"} // REQUIRE_SEMANTIC_CHECK (value of conditions)
                    },
                    or: {
                        type: "array",
                        items: {type: "string"} // REQUIRE_SEMANTIC_CHECK (value of states)
                    }
                },
                oneOf: [
                    // and_combined
                    {
                        type: "object",
                        properties: {
                            type: {const: "and_combined"}
                        },
                        required: ["and"]
                    },

                    // or_combined
                    {
                        type: "object",
                        properties: {
                            type: {const: "or_combined"}
                        },
                        required: ["or"]
                    },

                    // skill_name
                    {
                        type: "object",
                        required: ["op"],
                        discriminator: {propertyName: "op"},
                        properties: {
                            type: {const: "skill_name"},
                            op: {
                                type: "string",
                                enum: ["appear", "at"]
                            },
                            name: {type: "string"}, // REQUIRE_SEMANTIC_CHECK (value of all_appeared_skills)
                            p: {
                                type: "integer",
                                minimum: 0
                            } // REQUIRE_SEMANTIC_CHECK ( <= slot_count )
                        },
                        oneOf: [
                            // skill_name:appear
                            {
                                type: "object",
                                properties: {
                                    op: {const: "appear"}
                                },
                                required: ["name"]
                            },
                            // skill_name:at
                            {
                                type: "object",
                                properties: {
                                    op: {const: "at"}
                                },
                                required: ["name", "p"]
                            }
                        ]
                    },

                    // cost
                    {
                        type: "object",
                        required: ["op"],
                        discriminator: {propertyName: "op"},
                        properties: {
                            type: {const: "cost"},
                            op: {
                                type: "string",
                                enum: ["over", "below", "in_range", "increase", "decrease"]
                            },
                            value: {
                                type: "number",
                                minimum: 0
                            }, // REQUIRE_SEMANTIC_CHECK ( <= max_cost )
                            range: {
                                type: "array",
                                minItems: 2,
                                maxItems: 2,
                                items: {
                                    type: "number",
                                    minimum: 0
                                }
                            } // REQUIRE_SEMANTIC_CHECK ( <= max_cost, range[0] < range[1] )
                        },
                        oneOf: [
                            // cost:over / below / increase / decrease
                            {
                                type: "object",
                                properties: {
                                    op: {
                                        type: "string",
                                        enum: ["over", "below", "increase", "decrease"]
                                    }
                                },
                                required: ["value"]
                            },
                            // cost:in_range
                            {
                                type: "object",
                                properties: {
                                    op: {
                                        type: "string",
                                        enum: ["in_range"]
                                    }
                                },
                                required: ["range"]
                            }
                        ]
                    },

                    // boss_health
                    {
                        type: "object",
                        required: ["op"],
                        discriminator: {propertyName: "op"},
                        properties: {
                            type: {const: "boss_health"},
                            op: {
                                type: "string",
                                enum: ["C_over", "C_below", "C_in_range", "C_increase", "C_decrease", "M_equal"]
                            },
                            value: {type: "number"},
                            range: {
                                type: "array",
                                minItems: 2,
                                maxItems: 2,
                                items: {type: "number"}
                            } // REQUIRE_SEMANTIC_CHECK ( range[0] < range[1] )
                        },
                        oneOf: [
                            // boss_health:C_over / C_below / C_increase / C_decrease / M_equal
                            {
                                type: "object",
                                properties: {
                                    op: {
                                        type: "string",
                                        enum: ["C_over", "C_below", "C_increase", "C_decrease", "M_equal"]
                                    }
                                },
                                required: ["value"]
                            },
                            // boss_health:C_in_range
                            {
                                type: "object",
                                properties: {
                                    op: {
                                        type: "string",
                                        enum: ["C_in_range"]
                                    }
                                },
                                required: ["range"]
                            }
                        ]
                    }
                ]
            }
        },

        actions: {
            type: "object",
            additionalProperties: {
                type: "array",
                items: {
                    type: "object",
                    required: ["t"],
                    discriminator: {propertyName: "t"},
                    properties: {
                        t: {type: "string"},
                        desc: {type: "string"}
                    },
                    oneOf: [
                        // acc
                        {
                            type: "object",
                            properties: {
                                t: {const: "acc"},
                                op: {
                                    type: "string",
                                    enum: ["1", "2", "3"]
                                }
                            },
                            required: ["op"]
                        },

                        // auto
                        {
                            type: "object",
                            properties: {
                                t: {const: "auto"},
                                op: {
                                    type: "string",
                                    enum: ["on", "off", "opposite"]
                                }
                            },
                            required: ["op"]
                        },

                        // skill
                        {
                            type: "object",
                            properties: {
                                t: {const: "skill"},
                                op: {
                                    type: "string",
                                    enum: ["auto", "name", "l_rel_p"]
                                },
                                check: {
                                    type: "object",
                                    properties: {
                                        op: {
                                            type: "string",
                                            enum: ["C_decrese", "C_decrease"]
                                        },
                                        value: {type: "number"},
                                        timeout: {
                                            type: "integer",
                                            minimum: 0
                                        }
                                    }
                                },
                                skill_n: {type: "string"}, // REQUIRE_SEMANTIC_CHECK ( value of all_appeared_skills)
                                l_rel_idx: {
                                    type: "integer",
                                    minimum: 0,
                                    maximum: 5
                                }, // REQUIRE_SEMANTIC_CHECK ( < slot_count )
                                target: {
                                    oneOf: [
                                        {
                                            type: "object",
                                            required: ["op", "x", "y"],
                                            properties: {
                                                op: {const: "fixed"},
                                                x: {
                                                    type: "integer",
                                                    minimum: 0,
                                                    maximum: 1280
                                                },
                                                y: {
                                                    type: "integer",
                                                    minimum: 0,
                                                    maximum: 720
                                                }
                                            }
                                        },
                                        {
                                            type: "object",
                                            required: ["op", "obj"],
                                            properties: {
                                                op: {
                                                    type: "string",
                                                    enum: ["yolo_t_p", "yolo_c_p", "yolo_g_p", "yolo_l_p", "yolo_r_p"]
                                                },
                                                // REQUIRE_SEMANTIC_CHECK (value of fronts / backs)
                                                obj: {
                                                    type: "array",
                                                    items: {type: "string"},
                                                    minItems: 1
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            required: ["op"],
                            discriminator: {propertyName: "op"},
                            oneOf: [
                                // skill:auto
                                {
                                    type: "object",
                                    properties: {
                                        op: {const: "auto"}
                                    },
                                    required: ["check"]
                                },
                                // skill:name
                                {
                                    type: "object",
                                    properties: {
                                        op: {const: "name"}
                                    },
                                    required: ["skill_n", "target"]
                                },
                                // skill:l_rel_p
                                {
                                    type: "object",
                                    properties: {
                                        op: {const: "l_rel_p"}
                                    },
                                    required: ["l_rel_idx", "target"]
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }
} as const

export const validateBAASWorkflow = ajv.compile(BAASWorkflowSchema)