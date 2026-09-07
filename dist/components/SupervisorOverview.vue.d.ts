import { SupervisorLocale } from '../presentation';
import { SupervisorStatusView } from '../types';
type __VLS_Props = {
    readonly status: SupervisorStatusView;
    readonly processingGroupId?: string | null;
    readonly processingAction?: string | null;
    readonly locale?: SupervisorLocale;
    readonly showProbeControls?: boolean;
};
declare const __VLS_export: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    start: (groupId: string) => any;
    stop: (groupId: string) => any;
    restart: (groupId: string) => any;
    recover: () => any;
    refresh: () => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onStart?: (groupId: string) => any;
    onStop?: (groupId: string) => any;
    onRestart?: (groupId: string) => any;
    onRecover?: () => any;
    onRefresh?: () => any;
}>, {
    readonly locale: SupervisorLocale;
    readonly processingAction: string | null;
    readonly showProbeControls: boolean;
    readonly processingGroupId: string | null;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
