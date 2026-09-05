import DefaultLayout from '@/components/layouts/default/layout';
import TopNavBar from '@/components/top_nav/top_nav';
import {
    MOCK_PROJECTS,
    WorkflowDashboard,
    WorkflowHomeSidebar,
} from '@/features/auto-fight';

export default function Home() {
    return (
        <DefaultLayout
            header={<TopNavBar/>}
            sidebar={<WorkflowHomeSidebar projects={MOCK_PROJECTS}/>}
            sidebarWidth="16rem"
            content={<WorkflowDashboard projects={MOCK_PROJECTS}/>}
            contentMode="fill"
        />
    );
}
