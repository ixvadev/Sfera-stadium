import { Tabs } from "../components/ui/tabs";

function Index() {
  const myTabs = [
    { title: "Tab 1", value: "tab1", content: <div>Content for Tab 1</div> },
    { title: "Tab 2", value: "tab2", content: <div>Content for Tab 2</div> },
    { title: "Tab 3", value: "tab3", content: <div>Content for Tab 3</div> },
  ];

  return (
    <div>
      <Tabs tabs={myTabs} />
    </div>
  );
}

export default Index;
