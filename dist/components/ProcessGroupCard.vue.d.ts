import { ProcessGroupView } from '../types';
type __VLS_Props = {
    readonly group: ProcessGroupView;
    readonly processingAction?: string | null;
    readonly controlsDisabled?: boolean;
};
declare const __VLS_export: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    start: (groupId: string) => any;
    stop: (groupId: string) => any;
    restart: (groupId: string) => any;
    probe: (groupId: string) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onStart?: (groupId: string) => any;
    onStop?: (groupId: string) => any;
    onRestart?: (groupId: string) => any;
    onProbe?: (groupId: string) => any;
}>, {
    readonly processingAction: string | null;
    readonly controlsDisabled: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
