import type {WorkflowViewModel} from '@/features/auto-fight/model/workflow';

function deepFreeze<T>(value: T): T {
    if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
        for (const child of Object.values(value)) {
            deepFreeze(child);
        }
        Object.freeze(value);
    }
    return value;
}

const MOCK_WORKFLOW_DATA: WorkflowViewModel = {
    id: 'mock-raid-workflow',
    name: 'BAAS 自动战斗 · 状态图演示',
    description: '覆盖条件、默认、动作失败、循环和多结束状态的前端演示工作流。',
    startStateId: 'opening',
    states: {
        opening: {
            id: 'opening',
            name: '开场',
            description: '初始化战斗并判断是否可以进入爆发阶段。',
            actionId: 'start-battle',
            actionFailTransition: 'restart',
            transitions: [{conditionId: 'cost-ready', nextStateId: 'burst'}],
            defaultTransition: 'wait-cost',
        },
        'wait-cost': {
            id: 'wait-cost',
            name: '等待费用',
            description: '继续等待费用，超时后结束本轮演示。',
            actionId: 'wait',
            transitions: [{conditionId: 'cost-ready', nextStateId: 'burst'}],
            defaultTransition: 'timeout',
        },
        burst: {
            id: 'burst',
            name: '爆发输出',
            description: '释放主要技能并检查 Boss 是否已经被击败。',
            actionId: 'burst-damage',
            transitions: [{conditionId: 'boss-defeated', nextStateId: 'victory'}],
            defaultTransition: 'finisher',
        },
        finisher: {
            id: 'finisher',
            name: '收尾技能',
            description: '成功执行后结束；失败时仍可转入重新开始。',
            actionId: 'finishing-skill',
            actionFailTransition: 'restart',
            transitions: [],
        },
        restart: {
            id: 'restart',
            name: '重新开始',
            description: '重新开始战斗，然后返回开场状态。',
            actionId: 'restart-battle',
            transitions: [],
            defaultTransition: 'opening',
        },
        victory: {
            id: 'victory',
            name: '战斗胜利',
            description: 'Boss 已被击败，没有后续状态。',
            transitions: [],
        },
        timeout: {
            id: 'timeout',
            name: '超时结束',
            description: '费用等待超时，没有后续状态。',
            transitions: [],
        },
    },
    actions: {
        'start-battle': {
            id: 'start-battle',
            name: '启动战斗',
            description: '启用自动战斗并设置三倍速。',
            steps: [
                {type: 'auto', description: '开启 Auto'},
                {type: 'speed', description: '设置战斗速度', parameters: {value: 3}},
            ],
        },
        wait: {
            id: 'wait',
            name: '等待',
            description: '等待下一次状态判断。',
            steps: [{type: 'wait', description: '等待 500 ms', parameters: {duration: 500}}],
        },
        'burst-damage': {
            id: 'burst-damage',
            name: '爆发输出',
            description: '依次释放辅助和主力技能。',
            steps: [
                {type: 'skill', description: '释放辅助技能', parameters: {slot: 2}},
                {type: 'skill', description: '释放主力技能', parameters: {slot: 1}},
            ],
        },
        'finishing-skill': {
            id: 'finishing-skill',
            name: '收尾技能',
            description: '尝试释放最后一次技能。',
            steps: [{type: 'skill', description: '释放收尾技能', parameters: {slot: 3}}],
        },
        'restart-battle': {
            id: 'restart-battle',
            name: '重开战斗',
            description: '结束当前战斗并重新进入。',
            steps: [{type: 'restart', description: '重新开始当前关卡'}],
        },
    },
    conditions: {
        'cost-ready': {
            id: 'cost-ready',
            name: '费用充足',
            description: '当前技能费用达到爆发要求。',
            type: 'cost',
            expression: 'cost >= 6',
        },
        'boss-defeated': {
            id: 'boss-defeated',
            name: 'Boss 已击败',
            description: '识别到 Boss 生命值归零。',
            type: 'boss-health',
            expression: 'boss_health <= 0',
        },
    },
    sourceJson: {
        start_state: '开场',
        states: {
            开场: {
                action: '启动战斗',
                action_fail_transition: '重新开始',
                transitions: [{condition: '费用充足', next: '爆发输出'}],
                default_transition: '等待费用',
            },
            等待费用: {
                action: '等待',
                transitions: [{condition: '费用充足', next: '爆发输出'}],
                default_transition: '超时结束',
            },
            爆发输出: {
                action: '爆发输出',
                transitions: [{condition: 'Boss 已击败', next: '战斗胜利'}],
                default_transition: '收尾技能',
            },
            收尾技能: {action: '收尾技能', action_fail_transition: '重新开始'},
            重新开始: {action: '重开战斗', default_transition: '开场'},
            战斗胜利: {},
            超时结束: {},
        },
        actions: {
            启动战斗: [
                {type: 'auto', desc: '开启 Auto'},
                {type: 'speed', desc: '设置三倍速', value: 3},
            ],
            等待: [{type: 'wait', desc: '等待 500 ms', duration: 500}],
            爆发输出: [
                {type: 'skill', desc: '释放辅助技能', slot: 2},
                {type: 'skill', desc: '释放主力技能', slot: 1},
            ],
            收尾技能: [{type: 'skill', desc: '释放收尾技能', slot: 3}],
            重开战斗: [{type: 'restart', desc: '重新开始当前关卡'}],
        },
        conditions: {
            费用充足: {type: 'cost', expression: 'cost >= 6'},
            'Boss 已击败': {type: 'boss-health', expression: 'boss_health <= 0'},
        },
        _mock_note: '仅用于 GUI 演示，不代表真实轴文件 Schema。',
    },
};

export const MOCK_WORKFLOW = deepFreeze(MOCK_WORKFLOW_DATA);
