import { ReactNode, createContext, useContext } from "react";

// child props를 자식에게 줄 것이란 타입 설정
export interface testProviderProps {
  children?: ReactNode;
}

// useContext 생성
const TestContext = createContext<
  Array<{ idx: number; name: string }> | undefined
>(undefined);

// context Type 설정
export const useTestProps = () => {
  //useContext에 저장하겠다.
  const context = useContext(TestContext);
  if (!context) {
    throw new Error("useTestProps must be used within a TestProvider");
  }
  return context;
};

const TestProvider: React.FC<testProviderProps> = ({ children }) => {
  const testProps = [
    { idx: 1, name: "테스트 1" },
    { idx: 2, name: "테스트 2" },
    { idx: 3, name: "테스트3" },
  ];

  return (
    // useContext에 보관하고 자식으로 내려준다? 요런 느낌으로
    <TestContext.Provider value={testProps}>{children}</TestContext.Provider>
  );
};

export default TestProvider;
