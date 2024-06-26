import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { z } from 'zod';
import _ from '@lodash';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import useJwtAuth from '../useJwtAuth';
import { useTranslation } from 'react-i18next';

/**
 * Form Validation Schema
 */
const schema = z.object({
    email: z.string().nonempty('You must enter SOMETHING'),
    password: z
        .string()
        .min(4, 'Password is too short - must be at least 4 chars.')
        .nonempty('Please enter your password.')
});

type FormType = {
    email: string;
    password: string;
    remember?: boolean;
};

const defaultValues = {
    email: '',
    password: '',
    remember: true
};

const CustomSignInForm = () => {
    const { t } = useTranslation('signIn');

    const [mockUsername, setMockUsername] = useState(null);
    const [mockPassword, setMockPassword] = useState(null);
    const { signIn, isLoading } = useJwtAuth();

    const { control, formState, handleSubmit, setValue, setError } = useForm<FormType>({
        mode: 'onChange',
        defaultValues,
        resolver: zodResolver(schema)
    });

    const { isValid, dirtyFields, errors } = formState;

    useEffect(() => {
        setValue('email', 'mattusrivas@gmail.com', { shouldDirty: true, shouldValidate: true });
        setValue('password', 'mato', { shouldDirty: true, shouldValidate: true });
    }, [setValue, mockUsername]);

    function onSubmit(formData: FormType) {
        const { email, password } = formData;
        signIn({
            email,
            password
        }).then((response: any) => {
            if (response.name === "AxiosError") {
                const errorData = response.response.data;
                setError('password', {
                    type: 'manual',
                    message: errorData.message
                });
            }
        }).catch(
            (
                error: AxiosError<
                    {
                        type: 'email' | 'password' | 'remember' | `root.${string}` | 'root';
                        message: string;
                    }[]
                >
            ) => {
                const errorData = error?.response?.data;
                if (errorData?.length) {
                    errorData.forEach((err) => {
                        setError(err.type, {
                            type: 'manual',
                            message: err.message
                        });
                    });
                }
            }
        )
    }

    return (
        <>
            <form
                name="loginForm"
                noValidate
                className="mt-32 flex w-full flex-col justify-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mb-24"
                            label="Email"
                            autoFocus
                            type="email"
                            error={!!errors.email}
                            helperText={errors?.email?.message}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mb-24"
                            label="Password"
                            type="password"
                            error={!!errors.password}
                            helperText={errors?.password?.message}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    )}
                />

                <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
                    <Controller
                        name="remember"
                        control={control}
                        render={({ field }) => (
                            <FormControl>
                                <FormControlLabel
                                    label={t('SIGNIN_REMEMBER_ME')}
                                    control={
                                        <Checkbox
                                            size="small"
                                            {...field}
                                        />
                                    }
                                />
                            </FormControl>
                        )}
                    />

                    <Link
                        className="text-md font-medium"
                        to="/pages/auth/forgot-password"
                    >
                        {t('SIGNIN_FORGOT_PASSWORD')}
                    </Link>
                </div>

                <Button
                    variant="contained"
                    color="secondary"
                    className=" mt-16 w-full"
                    aria-label="Sign in"
                    disabled={_.isEmpty(dirtyFields) || !isValid || isLoading}
                    type="submit"
                    size="large"
                >
                    {t('SIGNIN_LABEL')}
                </Button>
            </form>
        </>
    );
}

export default CustomSignInForm;
