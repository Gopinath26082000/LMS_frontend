import { useState } from 'react'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';
import Customerlogin from './Pages/Customerlogin';
import CustomerRegister from './Pages/CustomerRegister';
import Hrlogin from './Pages/Hrlogin';
import TlRegister from './Pages/Tlregister';
import TLLogin from './Pages/Tllogin';
import EmployeeRegister from './Pages/EmployeeRegister';
import EmployeeLogin from './Pages/EmployeeLogin';
import Tlhomepage from './Pages/Tlhomepage';
import Tlfiledetails from './Pages/Tlfiledetails';
import AdminEmployeeDetails from './Pages/AdminEmployeeDetails';
import AdminFileDetails from './Pages/AdminFileDetails';
import EmployeeDashboard from './Pages/EmployeeDashboard';
import Hrdashboard from './Pages/Hrdashboard';
import Hremployeedetails from './Pages/Hremployeedetails';
import Hrfiledetails from './Pages/Hrfiledetails';
import Hrfilerequest from './Pages/Hrfilerequest';
import EmployeeFileDownloads from './Pages/EmployeeFileDownloads';
import AdminAnalysis from './Pages/AdminAnalysis';
import HrAnalysis from './Pages/HrAnalysis';
import ScholarshipForm from './Pages/ScholarshipForm';
import FarmersAppliedJobManager from './Pages/FarmersAppliedJobManager';
import FarmerComplaints from './Pages/FarmerComplaints';
import FarmerAnnouncements from './Pages/FarmerAnnouncements';
import AdminComplaints from './Pages/AdminComplaints';
import AdminAnnouncement from './Pages/AdminAnnouncement';
import FarmerManagerAnnouncements from './Pages/FarmerManagerAnnouncements';
import  StudentDirectory from './Pages/StudentDirectory';
import StaffDirectory from './Pages/StaffDirectory';
import StaffAttendence from './Pages/StaffAttendence';
function App() {
 
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="adminlogin" element={<AdminLogin />} />
        <Route path="admindashboard" element={<AdminDashboard />} />
        <Route path="customerlogin" element={<Customerlogin />} />
        <Route path="customerregister" element={<CustomerRegister />} />
        <Route path="hrlogin" element={<Hrlogin />} />
        <Route path="tlregister" element={<TlRegister />} />
        <Route path="tllogin" element={<TLLogin />} />
        <Route path="employeeregister" element={<EmployeeRegister />} />
        <Route path="employeelogin" element={<EmployeeLogin />} />
        <Route path="tlhomepage" element={<Tlhomepage />} />
        <Route path="tlfiledetails" element={<Tlfiledetails />} />
        <Route path="adminemployeedetails" element={<AdminEmployeeDetails />} />
        <Route path="adminfiledetails" element={<AdminFileDetails />} />
        <Route path="employeedashboard" element={<EmployeeDashboard />} />
        <Route path="hrdashboard" element={<Hrdashboard />} />
        <Route path="hremployeedetails" element={<Hremployeedetails />} />
        <Route path="hrfiledetails" element={<Hrfiledetails />} />
        <Route path="hrfilerequest" element={<Hrfilerequest />} />
        <Route path="employeefiledownloads" element={<EmployeeFileDownloads />} />
        <Route path="adminanalysis" element={<AdminAnalysis />} />
        <Route path="hranalysis" element={<HrAnalysis />} />
        <Route path="scholarship" element={<ScholarshipForm />} />
        <Route path="farmersapplied" element={<FarmersAppliedJobManager />} />
        <Route path="farmercomplaints" element={<FarmerComplaints />} />
        <Route path="farmerannouncement" element={<FarmerAnnouncements />} />
        <Route path="admincomplaints" element={<AdminComplaints />} />
        <Route path="adminannouncements" element={<AdminAnnouncement />} />
        <Route path="farmermanagerannouncements" element={<FarmerManagerAnnouncements />} />
        <Route path="studentdirectory" element={<StudentDirectory />} />
        <Route path="staffdirectory" element={<StaffDirectory />} />
        <Route path="staffattendence" element={<StaffAttendence />} />
        </Routes>
    </div>
  )
}

export default App
