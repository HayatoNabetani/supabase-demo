import { getPosts } from "@/datas/posts";
import { format } from "date-fns";
import FormComponent from "./components/form";
import { signIn } from "./actions/auth";
import { currentUser } from "./datas/auth";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { deletePost } from "./actions/post";
import DeleteButton from "./components/delete-button";
import Link from "next/link";
import SearchForm from "./components/search-form";

// http://localhost:3000/?keyword=aaa これでsearchParamsで受け取れる
// 動的生成のサーバーサイドレンダリングになる
export default async function Home({
  searchParams: { keyword },
}: {
  searchParams: {
    keyword?: string;
  };
}) {
  const posts = await getPosts(keyword);
  const user = await currentUser();
  if (!posts) {
    return null;
  }

  return (
    <main className="container max-w-2xl">
      {user && <FormComponent />}

      <SearchForm />
      <main className="space-y-2 container my-6">
        {posts?.map((post) => (
          <div key={post.id} className="p-4 border rounded shadow-sm">
            <h2>{post.body}</h2>
            <p>{format(post.createdAt, "yyyy年mm月dd日")}</p>
            {/* <form action={deletePost.bind(null, post.id)}>
              <Button size="icon" variant="ghost">
                <Trash size={16} />
              </Button>
            </form> */}
            <DeleteButton postId={post.id} />
            <Button size="icon" variant="ghost">
              <Link href={`/posts/${post.id}/edit`}>
                <Edit size={16} />
              </Link>
            </Button>
          </div>
        ))}
      </main>
    </main>
  );
}
