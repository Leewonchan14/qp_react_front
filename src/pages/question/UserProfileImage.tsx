import React from 'react';
import { QuestionResponse } from '../../apis/questions.api';
import TestProfile from '../../assets/test_profile.png';

export default React.memo(function UserProfileImage({
  user,
  className,
  ...props
}: {
  user?: QuestionResponse['user'];
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`overflow-clip min-w-20 min-h-20 w-20 h-20 rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.3)] ${className}`}
      {...props}
    >
      {user?.profileImage && (
        <img
          className="h-full w-full object-contain"
          src={user.profileImage}
          alt=""
        />
      )}
      {!user?.profileImage && (
        <img className="w-full h-full object-cover" src={TestProfile} alt="" />
      )}
    </div>
  );
});
