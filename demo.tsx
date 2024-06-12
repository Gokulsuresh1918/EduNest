<>
{/* Input fields for new password */}
<Input
  type="password"
  value={newPassword}
  onChange={(e) => setNewPassword(e.target.value)}
  placeholder="Enter New Password"
  className="bg-blue-300 rounded-xl border-red-50"
/>
<Input
  type="password"
  value={confirmNewPassword}
  onChange={(e) => setConfirmNewPassword(e.target.value)}
  placeholder="Confirm New Password"
  className="bg-blue-300 rounded-xl border-red-50"
/>
<Button
  onClick={handleChangePassword}
  className="bg-blue-800 rounded-xl text-white"
  variant="outline"
>
  Change Password
</Button>
</>