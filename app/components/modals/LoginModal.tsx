'use client';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai'; 
import {FcGoogle} from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import Button from '../Button';
import { signIn } from 'next-auth/react';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import ToasterProvider from '@/app/providers/ToasterProvider';
import {toast} from 'react-hot-toast';
import Router from 'next/router';
import { useRouter } from 'next/navigation';

const LoginModal = () => {

    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register, 
        handleSubmit, 
        formState:{
            errors, 
        }} = useForm<FieldValues>({
            defaultValues: {
                email: '',
                password: ''
            }
        });

    const onSubmit:SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);
        
        signIn('credentials', {
            ...data, 
            redirect: false,
        })
        .then((callback) =>{
            setIsLoading(false);

            if(callback?.ok){
                toast.success('Login successful');
                router.refresh();
                loginModal.onClose();
            }

            if(callback?.error){
                toast.error(callback.error);
            }
        })
    }

    const toggleModal = useCallback(() =>{
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title="Welcome back."
                subtitle="Login to your account"
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
                    label="Google"
                    icon={FcGoogle}
                    onClick={() => signIn('google')}
                />
                <Button 
                    outline
                    label="GitHub"
                    icon={AiFillGithub}
                    onClick={() => signIn('github')}
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
                        Don&apos;t have an account?
                    </div>
                    <div
                        onClick={toggleModal} 
                        className='text-rose-500 cursor-pointer hover:underline'>
                        Create an account
                    </div>
                </div>

            </div>
        </div>
    )
    

  return (
    <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal