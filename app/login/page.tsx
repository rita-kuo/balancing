import LoginWithLine from "@/app/login/LoginWithLine";

const Page = () => {
  return (
    <div className="space-y-4 [&>*]:mx-auto">
      <h1 className="w-max">登入</h1>
      <LoginWithLine />
    </div>
  );
};

export default Page;
