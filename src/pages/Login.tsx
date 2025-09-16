import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Sparkles,
  Github,
  Chrome
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const creds = [
      { email: 'admin@devflow.com', password: 'admin123', role: 'admin' },
      { email: 'manager@devflow.com', password: 'manager123', role: 'manager' },
      { email: 'user@devflow.com', password: 'user123', role: 'user' },
    ];

    setTimeout(() => {
      const match = creds.find(c => c.email === email && c.password === password);

      if (match) {
        localStorage.setItem('userRole', match.role);
        localStorage.setItem('userEmail', match.email);
        if (rememberMe) localStorage.setItem('rememberMe', '1');

        toast({
          title: `Logged in as ${match.role}`,
          description: 'Welcome to DevFlow CRM',
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      }

      setIsLoading(false);
    }, 800);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: `${provider} Login`,
        description: "Redirecting to dashboard...",
      });
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className='min-h-screen flex'>
      {/* Left Side - Branding */}
      <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-secondary relative overflow-hidden'>
        <div className='absolute inset-0 bg-black/20' />
        <div className='relative z-10 flex flex-col justify-center items-center p-12 text-white'>
          <div className='flex items-center space-x-3 mb-8'>
            <div className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center'>
              <Sparkles className='w-8 h-8' />
            </div>
            <span className='text-3xl font-bold'>DevFlow</span>
          </div>

          <h1 className='text-4xl font-bold text-center mb-6'>
            Welcome back to your creative workspace
          </h1>

          <p className='text-xl text-white/80 text-center max-w-md'>
            Continue building amazing projects and turning your ideas into
            reality.
          </p>

          <div className='mt-12 grid grid-cols-2 gap-4 text-center'>
            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
              <div className='text-2xl font-bold'>10K+</div>
              <div className='text-white/80 text-sm'>Active Projects</div>
            </div>
            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
              <div className='text-2xl font-bold'>50K+</div>
              <div className='text-white/80 text-sm'>Ideas Captured</div>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className='absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse' />
        <div className='absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full animate-bounce' />
        <div className='absolute top-1/2 right-10 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000' />
      </div>

      {/* Right Side - Login Form */}
      <div className='flex-1 flex items-center justify-center p-8 bg-background'>
        <div className='w-full max-w-md'>
          <div className='text-center mb-8'>
            <div className='lg:hidden flex items-center justify-center space-x-2 mb-6'>
              <div className='w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center'>
                <Sparkles className='w-5 h-5 text-white' />
              </div>
              <span className='text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
                DevFlow
              </span>
            </div>

            <h2 className='text-3xl font-bold mb-2'>Sign in to your account</h2>
            <p className='text-muted-foreground'>
              Enter your credentials to access your dashboard
            </p>
          </div>

          <Card className='p-6 bg-surface/50 backdrop-blur-sm border-border/40'>
            {/* Social Login Buttons */}
            <div className='grid grid-cols-2 gap-3 mb-6'>
              <Button
                variant='outline'
                className='w-full'
                onClick={() => handleSocialLogin("Google")}
                disabled={isLoading}>
                <Chrome className='w-4 h-4 mr-2' />
                Google
              </Button>
              <Button
                variant='outline'
                className='w-full'
                onClick={() => handleSocialLogin("GitHub")}
                disabled={isLoading}>
                <Github className='w-4 h-4 mr-2' />
                GitHub
              </Button>
            </div>

            <div className='relative mb-6'>
              <Separator />
              <div className='absolute inset-0 flex items-center justify-center'>
                <span className='bg-surface px-3 text-sm text-muted-foreground'>
                  or continue with email
                </span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email address</Label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                  <Input
                    id='email'
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='pl-10'
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                  <Input
                    id='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='pl-10 pr-10'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground'>
                    {showPassword ? (
                      <EyeOff className='w-4 h-4' />
                    ) : (
                      <Eye className='w-4 h-4' />
                    )}
                  </button>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='remember'
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked === true)
                    }
                  />
                  <Label htmlFor='remember' className='text-sm'>
                    Remember me
                  </Label>
                </div>

                <Link
                  to='/forgot-password'
                  className='text-sm text-primary hover:text-primary/80 transition-colors'>
                  Forgot password?
                </Link>
              </div>

              <Button
                type='submit'
                className='w-full gradient-primary text-white'
                disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            {/* Sample Credentials */}
            {/* <div className="mt-6 p-4 bg-surface/30 rounded-lg border border-border/50">
              <h4 className="text-sm font-medium text-foreground mb-3">Sample Credentials:</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Admin:</span>
                  <span className="font-mono text-foreground">admin@devflow.com / admin123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Manager:</span>
                  <span className="font-mono text-foreground">manager@devflow.com / manager123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">User:</span>
                  <span className="font-mono text-foreground">user@devflow.com / user123</span>
                </div>
              </div>
            </div> */}

            <div className='mt-6 text-center'>
              <p className='text-sm text-muted-foreground'>
                Don't have an account?{" "}
                <Link
                  to='/register'
                  className='text-primary hover:text-primary/80 font-medium transition-colors'>
                  Sign up for free
                </Link>
              </p>
            </div>
          </Card>

          <div className='mt-8 text-center text-xs text-muted-foreground'>
            By signing in, you agree to our{" "}
            <Link to='/terms' className='text-primary hover:text-primary/80'>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to='/privacy' className='text-primary hover:text-primary/80'>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;