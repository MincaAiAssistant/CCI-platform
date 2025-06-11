import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';

import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/lib/auth-store';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AuthPage() {
  const { user, isAuthenticated, isLoading, login } = useAuthStore();
  const navigate = useNavigate();

  // Login form
  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onLoginSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      toast('Login successful', {
        description: 'Welcome back to Platforme CCI!',
      });
      navigate('/');
    } catch {
      toast.error('Login failed', {
        description: 'Please check your credentials and try again.',
      });
    }
  };

  // Redirect to home if already logged in
  if (isAuthenticated && user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md mx-auto px-4 py-12">
        <div className="flex justify-center mb-8">
          <img src={'/cci-logo.png'} alt="CCI Logo" className="h-20 w-auto" />
        </div>

        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-600">
          Welcome to the CCI France-Mexico AI
        </h1>

        {/* Only the Login form is now here */}
        <Card>
          <CardContent className="pt-6">
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <FormField
                    control={loginForm.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm cursor-pointer text-gray-500">
                          Remember me
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <div className="text-sm">
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <Button
                  disabled={isLoading}
                  type="submit"
                  className="w-full bg-[#3390C8] hover:bg-[#1e5dbe] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
