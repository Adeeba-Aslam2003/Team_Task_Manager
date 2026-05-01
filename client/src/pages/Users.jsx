import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { toast } from "sonner";
import {
  AddUser,
  Button,
  ConfirmatioDialog,
  Loading,
  Title,
  UserAction,
} from "../components";

import {
  useDeleteUserMutation,
  useUserActionMutation,
  useGetTeamListsQuery,   // ✅ FIXED
} from "../redux/slices/api/userApiSlice";

import { useRegisterMutation } from "../redux/apiSlice"; // login/register yahin hai

import { getInitials } from "../utils/index";

const Users = () => {
  // ✅ CORRECT HOOK
  const { data, isLoading, refetch } = useGetTeamListsQuery({ search: "" });

  const [registerUser] = useRegisterMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [userAction] = useUserActionMutation();

  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const userStatusClick = (el) => {
    setSelected(el);
    setOpenAction(true);
  };

  const deleteHandler = async () => {
    try {
      const res = await deleteUser(selected).unwrap();
      refetch();
      toast.success(res?.message || "Deleted");
      setSelected(null);
      setOpenDialog(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const userActionHandler = async () => {
    try {
      const res = await userAction({
        isActive: !selected?.isActive,
        id: selected?._id,
      }).unwrap();

      refetch();
      toast.success(res?.message || "Updated");
      setSelected(null);
      setOpenAction(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    refetch();
  }, [open]);

  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-left'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Title</th>
        <th className='py-2'>Email</th>
        <th className='py-2'>Role</th>
        <th className='py-2'>Active</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className='border-b text-gray-600'>
      <td className='p-2 flex items-center gap-3'>
        <div className='w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center'>
          {getInitials(user.name)}
        </div>
        {user.name}
      </td>
      <td className='p-2'>{user.title}</td>
      <td className='p-2'>{user.email}</td>
      <td className='p-2'>{user.role}</td>
      <td>
        <button
          onClick={() => userStatusClick(user)}
          className={clsx(
            "px-4 py-1 rounded-full",
            user?.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </button>
      </td>
      <td className='p-2 flex gap-4 justify-end'>
        <Button label='Edit' onClick={() => editClick(user)} />
        <Button label='Delete' onClick={() => deleteClick(user?._id)} />
      </td>
    </tr>
  );

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className='mb-6'>
        <div className='flex justify-between mb-8'>
          <Title title='Team Members' />

          <Button
            label='Add New User'
            icon={<IoMdAdd />}
            className='bg-blue-600 text-white'
            onClick={() => setOpen(true)}
          />
        </div>

        <div className='bg-white p-4 shadow-md rounded'>
          <table className='w-full'>
            <TableHeader />
            <tbody>
              {data?.map((user) => (
                <TableRow key={user._id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddUser open={open} setOpen={setOpen} userData={selected} />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
    </>
  );
};

export default Users;