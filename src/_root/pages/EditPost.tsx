import PostForm from '@/components/forms/PostForm'
import Loader from '@/components/shared/Loader';
import { useGetPostById } from '@/lib/react-query/quriesAndMutation';
import { useParams } from 'react-router-dom'

const EditPost = () => {

  // 1st we need to get the id of the post which is needed to be edited
  // to get the post details we need to create an api 
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || '');

  if (isPending)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );


  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img
            src="/assets/icons/edit.svg"
            width={36}
            height={36}
            alt="edit"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        {isPending
          ? <Loader />
          : <PostForm action="Update" post={post}
          />}
      </div>
    </div>
  );
};


export default EditPost