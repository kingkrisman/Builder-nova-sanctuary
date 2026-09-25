import { Route, Routes } from "react-router-dom";
import { AdminAuthProvider } from "./auth";
import { AdminGuard } from "./AdminLayout";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Overview from "./pages/Overview";
import { BlogList, ProjectsList, PropertiesList } from "./pages/Lists";
import PropertyForm from "./pages/PropertyForm";
import ProjectForm from "./pages/ProjectForm";
import BlogForm from "./pages/BlogForm";

/** Everything under /admin. Loaded as its own chunk, so visitors never download it. */
export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route element={<AdminGuard />}>
          <Route index element={<Overview />} />
          <Route path="properties" element={<PropertiesList />} />
          <Route path="properties/:id" element={<PropertyForm />} />
          <Route path="projects" element={<ProjectsList />} />
          <Route path="projects/:id" element={<ProjectForm />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/:id" element={<BlogForm />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}
