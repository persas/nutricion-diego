'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { useAdmin } from '@/components/providers/AdminProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AdminRequiredProps {
  message?: string;
  backHref?: string;
  backLabel?: string;
}

export default function AdminRequired({
  message = 'Solo el administrador puede realizar esta accion.',
  backHref = '/',
  backLabel = 'Volver',
}: AdminRequiredProps) {
  const { login } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError(false);

    const success = await login(password);
    if (!success) {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <Lock className="size-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">Acceso restringido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-center text-sm">{message}</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="password"
              placeholder="Password de admin"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              disabled={loading}
              autoFocus
            />
            {error && (
              <p className="text-destructive text-sm text-center">
                Password incorrecto
              </p>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={loading || !password.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                'Entrar como Admin'
              )}
            </Button>
          </form>

          <div className="text-center pt-2">
            <Link
              href={backHref}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              {backLabel}
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
