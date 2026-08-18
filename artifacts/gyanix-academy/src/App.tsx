import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Layout } from './components/layout';
import { ChatBot } from './components/chatbot';

import Home from './pages/home';
import About from './pages/about';
import Courses from './pages/courses';
import Scholarship from './pages/scholarship';
import Results from './pages/results';
import Gallery from './pages/gallery';
import Faculty from './pages/faculty';
import Contact from './pages/contact';

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">The page you are looking for doesn't exist or has been moved.</p>
      <a href="/" className="px-6 py-3 bg-secondary text-white font-bold rounded-lg hover:bg-secondary/90 transition-colors">
        Go Back Home
      </a>
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/courses" component={Courses} />
        <Route path="/scholarship" component={Scholarship} />
        <Route path="/results" component={Results} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/faculty" component={Faculty} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
      <Toaster />
      <ChatBot />
    </QueryClientProvider>
  );
}

export default App;
