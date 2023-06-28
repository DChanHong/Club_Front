import { useRouter } from "next/router";

const Testfold = () => {
  const router = useRouter();
  console.log(router.query);
  return <div>asdasd</div>;
};

export default Testfold;
