import DocsNavigation from "@/components/docs/DocsNavigation";
import GettingStartedWithCodeDisplay from "@/components/docs/GettingStartedWithCodeDisplay";
import Breadcrumb from "@/components/docs/Breadcrumb";

export default function DocsPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Docs" }]} />
      <GettingStartedWithCodeDisplay />
      <DocsNavigation />
    </div>
  );
}
