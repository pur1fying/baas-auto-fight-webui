import Ajv2020 from "ajv/dist/2020"
import addFormats from "ajv-formats"

const ajv = new Ajv2020({
    allErrors: true,
    strict: true,
    discriminator: true,
    messages: false
})

addFormats(ajv)

export const BAASWorkflowSchema = {
    $id: "https://example.com/schemas/baas-workflow.json",
    $schema: "https://json-schema.org/draft/2020-12/schema",

    type: "object",
    required: ["start_state", "conditions", "states", "actions"],

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
                            items: {type: "integer"} // REQUIRE_FURTHER_SEMANTIC_CHECK
                        },
                        max_ocr_region: {
                            type: "array",
                            minItems: 4,
                            maxItems: 4,
                            items: {type: "integer"} // REQUIRE_FURTHER_SEMANTIC_CHECK
                        },
                        ocr_region: {
                            type: "array",
                            minItems: 4,
                            maxItems: 4,
                            items: {type: "integer"} // REQUIRE_FURTHER_SEMANTIC_CHECK
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
                            items: {type: "string"}
                        },
                        back: {
                            type: "array",
                            items: {type: "string"}
                        },
                        slot_count: {
                            type: "integer",
                            minimum: 0,
                            maximum: 6
                        },
                        all_appeared_skills: {
                            type: "array",
                            items: {type: "string"}
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
            type: "string" // REQUIRE_FURTHER_SEMANTIC_CHECK
        },

        states: {
            type: "object",
            additionalProperties: {
                type: "object",
                properties: {
                    action: {type: "string"}, // REQUIRE_FURTHER_SEMANTIC_CHECK
                    action_fail_transition: {type: "string"}, // REQUIRE_FURTHER_SEMANTIC_CHECK
                    transitions: {
                        type: "array",
                        items: {
                            type: "object",
                            required: ["condition", "next"],
                            properties: {
                                condition: {type: "string"}, // REQUIRE_FURTHER_SEMANTIC_CHECK
                                next: {type: "string"} // REQUIRE_FURTHER_SEMANTIC_CHECK
                            }
                        }
                    },
                    default_transition: {type: "string"} // REQUIRE_FURTHER_SEMANTIC_CHECK
                }
            }
        },

        conditions: {
            type: "object",
            additionalProperties: {
                type: "object",
                discriminator: {propertyName: "type"},
                required: ["type"],
                properties: {type: {type: "string"}},
                oneOf: [
                    {
                        type: "object",
                        required: ["type", "and"],
                        properties: {
                            type: {const: "and_combined"},
                            and: {
                                type: "array",
                                items: {type: "string"}, // REQUIRE_FURTHER_SEMANTIC_CHECK
                                minItems: 1
                            },
                            timeout: {
                                type: "integer",
                                minimum: 0
                            }
                        }
                    },
                    {
                        type: "object",
                        required: ["type", "or"],
                        properties: {
                            type: {const: "or_combined"},
                            or: {
                                type: "array",
                                items: {type: "string"}, // REQUIRE_FURTHER_SEMANTIC_CHECK
                                minItems: 1
                            },
                            timeout: {
                                type: "integer",
                                minimum: 0
                            }
                        }
                    },
                    {
                        type: "object",
                        required: ["type", "op", "name"],
                        properties: {
                            type: {const: "skill_name"},
                            op: {
                                type: "string",
                                enum: ["appear", "not_appear"]
                            },
                            name: {type: "string"}, // REQUIRE_FURTHER_SEMANTIC_CHECK
                            timeout: {
                                type: "integer",
                                minimum: 0
                            },
                            and: {
                                type: "array",
                                items: {type: "string"} // REQUIRE_FURTHER_SEMANTIC_CHECK
                            },
                            or: {
                                type: "array",
                                items: {type: "string"} // REQUIRE_FURTHER_SEMANTIC_CHECK
                            }
                        }
                    },
                    {
                        type: "object",
                        required: ["type", "op", "value"],
                        properties: {
                            type: {const: "cost"},
                            op: {
                                type: "string",
                                enum: ["over", "below", "increase", "decrease", "in_range"]
                            },
                            value: {type: "number"}, // REQUIRE_FURTHER_SEMANTIC_CHECK
                            timeout: {
                                type: "integer",
                                minimum: 0
                            },
                            and: {
                                type: "array",
                                items: {type: "string"} // REQUIRE_FURTHER_SEMANTIC_CHECK
                            },
                            or: {
                                type: "array",
                                items: {type: "string"} // REQUIRE_FURTHER_SEMANTIC_CHECK
                            }
                        }
                    },
                    {
                        type: "object",
                        required: ["type", "op", "value"],
                        properties: {
                            type: {const: "boss_health"},
                            op: {
                                type: "string",
                                enum: ["over", "below", "equal"]
                            },
                            value: {type: "number"},
                            timeout: {
                                type: "integer",
                                minimum: 0
                            },
                            and: {
                                type: "array",
                                items: {type: "string"} // REQUIRE_FURTHER_SEMANTIC_CHECK
                            },
                            or: {
                                type: "array",
                                items: {type: "string"} // REQUIRE_FURTHER_SEMANTIC_CHECK
                            }
                        }
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
                    discriminator: {propertyName: "t"},
                    properties: {t: {type: "string"}},
                    required: ["t"],
                    oneOf: [
                        // acc
                        {
                            type: "object",
                            required: ["t", "op"],
                            properties: {
                                t: {const: "acc"},
                                op: {
                                    type: "string",
                                    enum: ["1", "2", "3"]
                                },
                                desc: {type: "string"}
                            }
                        },
                        // auto
                        {
                            type: "object",
                            required: ["t", "op"],
                            properties: {
                                t: {const: "auto"},
                                op: {
                                    type: "string",
                                    enum: ["on", "off", "opposite"]
                                },
                                desc: {type: "string"}
                            }
                        },
                        // skill
                        {
                            type: "object",
                            required: ["t", "op"],
                            properties: {
                                t: {const: "skill"},
                                op: {
                                    type: "string",
                                    enum: ["auto", "name", "l_rel_p"]
                                },
                                check: {type: "object"},
                                skill_n: {type: "string"}, // REQUIRE_FURTHER_SEMANTIC_CHECK
                                l_rel_idx: {
                                    type: "integer",
                                    minimum: 0,
                                    maximum: 2
                                },
                                target: {type: "object"},
                                desc: {type: "string"}
                            },
                            discriminator: {propertyName: "op"},
                            oneOf: [
                                // skill:auto
                                {
                                    type: "object",
                                    required: ["op", "check"],
                                    properties: {
                                        op: {const: "auto"},
                                        check: {
                                            type: "object",
                                            required: ["op", "value"],
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
                                        }
                                    }
                                },

                                // skill:name
                                {
                                    type: "object",
                                    required: ["op", "skill_n", "target"],
                                    properties: {
                                        op: {const: "name"},
                                        skill_n: {type: "string"}, // REQUIRE_FURTHER_SEMANTIC_CHECK
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
                                                        obj: {
                                                            type: "array",
                                                            items: {type: "string"}, // REQUIRE_FURTHER_SEMANTIC_CHECK
                                                            minItems: 1
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },

                                // skill:l_rel_p
                                {
                                    type: "object",
                                    required: ["op", "l_rel_idx", "target"],
                                    properties: {
                                        op: {const: "l_rel_p"},
                                        l_rel_idx: {
                                            type: "integer",
                                            minimum: 0,
                                            maximum: 2
                                        },
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
                                                        obj: {
                                                            type: "array",
                                                            items: {type: "string"}, // REQUIRE_FURTHER_SEMANTIC_CHECK
                                                            minItems: 1
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
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