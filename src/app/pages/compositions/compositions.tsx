import CompositionsListComponent from "./components/compositions-list";
import PageWrapperComponent from "../../components/page-wrapper";

export const CompositionsPage = () => {
  return (
    <PageWrapperComponent>
      <CompositionsListComponent />
    </PageWrapperComponent>
  );
};
