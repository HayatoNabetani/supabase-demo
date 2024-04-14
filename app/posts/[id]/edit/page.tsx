import FormComponent from "@/app/components/form";
import { getPost } from "@/datas/posts";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const post = await getPost(Number(id));
  return (
    <div>
      <FormComponent defaultValues={post!} />
    </div>
  );
};

export default Page;
