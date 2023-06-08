'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [subMitting, setSubMitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubMitting(true);
    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id,
        }),
      });
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubMitting(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      subMitting={subMitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
