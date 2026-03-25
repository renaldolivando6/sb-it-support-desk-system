import { Head, useForm, router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    username: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        username: '',
        password: '',
        remember: false,
    });

    const [showAdminModal, setShowAdminModal] = useState(false);
    const [adminPassword, setAdminPassword] = useState('');
    const [adminError, setAdminError] = useState('');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleSignUpClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowAdminModal(true);
        setAdminPassword('');
        setAdminError('');
    };

    const handleAdminSubmit = () => {
        if (adminPassword === 'gersang123') {
            setShowAdminModal(false);
            router.visit(route('register'));
        } else {
            setAdminError('Wrong admin password');
        }
    };

    return (
        <AuthLayout title="Log in to your account" description="Enter your username and password below to log in">
            <Head title="Log in" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            required
                            autoFocus
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            disabled={processing}
                            placeholder="Username"
                        />
                        <InputError message={errors.username} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                    Forgot password?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox id="remember" name="remember" checked={data.remember} onClick={() => setData('remember', !data.remember)} tabIndex={3} />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Log in
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Don't have an account?{' '}
                    <a href="#" onClick={handleSignUpClick} className="text-primary underline" tabIndex={5}>
                        Sign up
                    </a>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

            {/* Admin Password Modal */}
            {showAdminModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
                        <h3 className="text-lg font-semibold mb-4">Admin Access Required</h3>
                        <p className="text-sm text-gray-600 mb-4">Enter admin password to access registration.</p>
                        <Input
                            type="password"
                            value={adminPassword}
                            onChange={(e) => {
                                setAdminPassword(e.target.value);
                                setAdminError('');
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleAdminSubmit()}
                            placeholder="Admin password"
                            autoFocus
                        />
                        {adminError && <p className="text-red-500 text-sm mt-2">{adminError}</p>}
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={() => setShowAdminModal(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleAdminSubmit}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
}