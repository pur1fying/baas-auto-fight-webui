import {describe, expect, test} from 'vitest';

import {readDetailQuery, writeDetailQuery} from '@/features/auto-fight/resources/navigation/detailRoute';

describe('detail route query', () => {
    test('round-trips Unicode resource IDs with separate kind and ID values', () => {
        const params = writeDetailQuery(new URLSearchParams(), {
            kind: 'condition',
            id: 'Boss 已击败',
            title: 'Boss 已击败',
        });

        expect(params.get('detailKind')).toBe('condition');
        expect(params.get('detailId')).toBe('Boss 已击败');
        expect(readDetailQuery(params)).toEqual({kind: 'condition', id: 'Boss 已击败'});
    });

    test('rejects incomplete or unsupported resource identities', () => {
        expect(readDetailQuery(new URLSearchParams('detailKind=action'))).toBeUndefined();
        expect(readDetailQuery(new URLSearchParams('detailKind=version&detailId=v1'))).toBeUndefined();
    });
});
