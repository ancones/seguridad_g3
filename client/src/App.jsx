import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import Create from './components/Create';
import Dashboard from './components/Dashboard';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import UpdateSolicitud from './components/UpdateSolicitud';
import Solicitud from './components/Solicitud';

import { Routes, Route } from 'react-router-dom';


const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/" element={<Home />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
              <Route path="editor" element={<Editor />} />
            </Route>


            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
              <Route path="lounge" element={<Lounge />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin, ROLES.User]} />}>
              <Route path="crear" element={<Create />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin, ROLES.User]} />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            
            <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
              <Route path="/put/:id" element={<UpdateSolicitud />} />
            </Route>
            
            <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin, ROLES.User]} />}>
              <Route path="/solicitud/:id" element={<Solicitud />} />
            </Route>
            
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;