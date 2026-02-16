import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PresenterDashboard from '@/features/presenter/Dashboard';
import StudentView from '@/features/student/StudentView';

// Landing page for role selection
const Landing = () => (
  <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-display font-bold text-primary">Ingeniería de Sistemas 3</h1>
      <p className="text-muted-foreground">Select your role</p>
      <div className="flex gap-4 justify-center">
        <a href="/presenter" className="text-primary hover:text-primary/80 hover:underline">Presenter</a>
        <a href="/student" className="text-primary hover:text-primary/80 hover:underline">Student</a>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/presenter" element={<PresenterDashboard />} />
        <Route path="/student" element={<StudentView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
