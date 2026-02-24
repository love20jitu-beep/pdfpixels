import { redirect } from 'next/navigation';

// Redirect /tools to homepage where all tools are displayed with search
export default function ToolsPage() {
    redirect('/');
}
