import { getPosts } from "@/datas/posts";

export default async function Home() {
  const posts = await getPosts();
  if (!posts) {
    return null;
  }

  return (
    <main className="space-y-2 container my-6">
      {posts?.map((post) => (
        <div key={post.id} className="p-4 border rounded shadow-sm">
          <h2>{post.body}</h2>
          <p>{post.createdAt}</p>
        </div>
      ))}
    </main>
  );
}
