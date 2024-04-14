"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { deletePost } from "../actions/post";

type Props = {
  postId: number;
};
const DeleteButton: React.FC<Props> = ({ postId }) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        // この関数はサーバーで行われる
        deletePost(postId).then(() => {
          router.refresh();
        });
      }}
      size="icon"
      variant="ghost"
    >
      <Trash size={16} />
      <span className="sr-only">記事を削除</span>
    </Button>
  );
};

export default DeleteButton;
