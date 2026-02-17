import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Monitor, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { AuthProvider, useAuth } from '@/features/auth/AuthProvider';
import PresenterDashboard from '@/features/presenter/Dashboard';
import StudentView from '@/features/student/StudentView';
import LoginPage from '@/features/auth/LoginPage';

// Landing page for role selection
function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-b border-border/40">
        <span className="font-display font-bold text-xl text-primary">IS3 Talk</span>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl space-y-8"
        >
          <div className="text-center space-y-2">
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-primary">
              Ingeniería de Sistemas 3
            </h1>
            <p className="text-lg text-muted-foreground">Select your role to continue</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/student">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Card className="h-full cursor-pointer hover:border-primary/50 transition-colors bg-gradient-to-br from-card to-secondary/30">
                  <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                    <div className="p-4 bg-primary/20 rounded-full">
                      <GraduationCap className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold font-display">Student</h2>
                    <p className="text-muted-foreground text-sm">
                      Join the presentation and participate in live exams
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>

            <Link to="/presenter">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Card className="h-full cursor-pointer hover:border-primary/50 transition-colors bg-gradient-to-br from-card to-secondary/30">
                  <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                    <div className="p-4 bg-primary/20 rounded-full">
                      <Monitor className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold font-display">Presenter</h2>
                    <p className="text-muted-foreground text-sm">
                      Control slides, manage exams, and view live preview
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

// Auth guard: redirects to /login if not authenticated
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-muted-foreground animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/student" element={<StudentView />} />
          <Route
            path="/presenter"
            element={
              <ProtectedRoute>
                <PresenterDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
