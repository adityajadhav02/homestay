'use client';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai'; 
import {FcGoogle} from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import Button from '../Button';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import ToasterProvider from '@/app/providers/ToasterProvider';
import {toast} from 'react-hot-toast';

const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register, 
        handleSubmit, 
        formState:{
            errors, 
        }} = useForm<FieldValues>({
            defaultValues: {
                name: '', 
                email: '',
                password: ''
            }
        });

    const onSubmit:SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);
        
        axios.post('/api/register', data).then(() =>{
            registerModal.onClose();
        }).catch((err) =>{
            toast.error("Something went wrong.")
        }).finally(() =>{
            setIsLoading(false);
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title="Welcome to HomeStay"
                subtitle="Create a new account"
             />
             <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
             />
             <Input 
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
             />
             <Input 
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
             />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />

            <div className="flex flex-row gap-2">
                <Button 
                    outline
                    label="Continue with Google"
                    icon={FcGoogle}
                    onClick={() =>{}}
                />
                <Button 
                    outline
                    label="Continue with GitHub"
                    icon={AiFillGithub}
                    onClick={() =>{}}
                />
            </div>
            <div
            className='
                text-neutral-500
                mt-4
                font-light
                text-center
            '
            >
                <div className='flex flex-row items-center justify-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div
                        onClick={registerModal.onClose} 
                        className='text-rose-500 cursor-pointer hover:underline'>
                        Log In
                    </div>
                </div>

            </div>
        </div>
    )
    

  return (
    <Modal 
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal