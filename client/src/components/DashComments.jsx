import { Modal, Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, ModalHeader, ModalBody } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashComments() {

  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
 
  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
        const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
          method: 'DELETE',
        });
        const data = await res.json();
    
        if (res.ok) {
          setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
          setShowModal(false);
        } else{
          console.log(data.message);
        }
    } catch (error) {
        console.log(error.message);
    }

  };

  return (
    <div className='table-auto overflow-x-auto overflow-y-auto max-h-[70vh] md:mx-auto p-3 scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <TableHead>
              <TableRow>
                <TableHeadCell>Date updated</TableHeadCell>
                <TableHeadCell>Comment content</TableHeadCell>
                <TableHeadCell>Number of Likes</TableHeadCell>
                <TableHeadCell>PostId</TableHeadCell>
                <TableHeadCell>UserId</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className='divide-y'>
              {comments.map((comment) => (
                  <TableRow key={comment._id}  className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <TableCell>
                      {new Date(comment.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                        {comment.content}
                    </TableCell>
                    <TableCell>
                        {comment.numberOfLikes}
                    </TableCell>
                    <TableCell>{comment.postId}</TableCell>
                    <TableCell>{comment.userId}</TableCell>
                    <TableCell>
                      <span onClick={() => {setShowModal(true); setCommentIdToDelete(comment._id);} } className='font-medium text-red-500 hover:underline cursor-pointer'>
                        Delete
                      </span>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no comments yet!</p>
      )}
      <Modal dismissible show={showModal} size="md" onClose={() => setShowModal(false)} popup>
          <ModalHeader />
          <ModalBody>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this comment?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="red" onClick={handleDeleteComment}>
                  Yes, I'm sure
                </Button>
                <Button color="alternative" onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
    </div>
  );
}