import React, { useState, useEffect } from 'react';
import { ViewScreen, StudentProfile, MatchItem, AdminStats, AdminActivity, ApprovedCredential } from './types';
import {
  INITIAL_PROFILES,
  INITIAL_MATCHES,
  INITIAL_ADMIN_STATS,
  INITIAL_ADMIN_ACTIVITIES,
  ASSETS,
} from './data/studentProfiles';
import { supabase } from './supabase';

import { Header } from './components/Header';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingDetailsScreen } from './components/OnboardingDetailsScreen';
import { VerificationScreen } from './components/VerificationScreen';
import { PaymentStepScreen } from './components/PaymentStepScreen';
import { AwaitingApprovalScreen } from './components/AwaitingApprovalScreen';
import { DiscoverScreen } from './components/DiscoverScreen';
import { MatchCelebrationModal } from './components/MatchCelebrationModal';
import { CampusPassModal } from './components/CampusPassModal';
import { AdminPanel } from './components/AdminPanel';
import { ChatsScreen } from './components/ChatsScreen';
import { ChatDetailScreen } from './components/ChatDetailScreen';
import { SecretCrushScreen } from './components/SecretCrushScreen';
import { UserProfileScreen } from './components/UserProfileScreen';
import { HowItWorksModal } from './components/HowItWorksModal';
import { TermsAndGuidelinesModal } from './components/TermsAndGuidelinesModal';
import { CampusPreviewsModal } from './components/CampusPreviewsModal';
import { AdminPasscodeModal } from './components/AdminPasscodeModal';
import { StudentLoginModal } from './components/StudentLoginModal';
import { MoltenMetal } from './components/MoltenMetal';
import { IntroVideoOverlay } from './components/IntroVideoOverlay';
import { SideNav } from './components/SideNav';
import SplashCursor from './components/SplashCursor';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewScreen>('splash');
  const [showIntroOverlay, setShowIntroOverlay] = useState(false);
  const [profiles, setProfiles] = useState<StudentProfile[]>(INITIAL_PROFILES);
  const [matches, setMatches] = useState<MatchItem[]>(INITIAL_MATCHES);
  const [selectedMatch, setSelectedMatch] = useState<MatchItem | null>(null);

  const [hasCampusPass, setHasCampusPass] = useState(false);
  const [matchedStudentForCelebration, setMatchedStudentForCelebration] = useState<StudentProfile | null>(null);

  const [showCampusPassModal, setShowCampusPassModal] = useState(false);
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  const [showPreviewsModal, setShowPreviewsModal] = useState(false);
  const [showAdminPasscodeModal, setShowAdminPasscodeModal] = useState(false);
  const [showStudentLoginModal, setShowStudentLoginModal] = useState(false);
  const [modalTermsType, setModalTermsType] = useState<'terms' | 'guidelines' | null>(null);

  // Student Onboarding details state
  const [userOnboardingData, setUserOnboardingData] = useState<{
    fullName: string;
    phoneNumber: string;
    regNumber?: string;
    email: string;
    major: string;
    year: string;
    campus: string;
    bio: string;
    quote: string;
    interests: string[];
    avatarUrl: string;
    gender?: 'male' | 'female' | 'other';
    lookingFor?: 'female' | 'male' | 'everyone';
  }>({
    fullName: 'Sarath Reddy',
    phoneNumber: '7676878700',
    regNumber: '7676878700',
    email: 'sarath.reddy@learner.manipal.edu',
    major: 'B.Tech Computer Science',
    year: '3rd Year',
    campus: 'MIT Manipal',
    bio: 'Tech enthusiast, late night coder & End Point sunset lover.',
    quote: 'Always looking for good coffee at Astra.',
    interests: ['Coffee', 'Music', 'Coding'],
    avatarUrl: ASSETS.userAvatar,
    gender: 'male',
    lookingFor: 'female',
  });

  const [adminStats, setAdminStats] = useState<AdminStats>(INITIAL_ADMIN_STATS);
  const [adminActivities, setAdminActivities] = useState<AdminActivity[]>(INITIAL_ADMIN_ACTIVITIES);
  const [approvedCredentials, setApprovedCredentials] = useState<ApprovedCredential[]>([]);

  // Sync approved credentials and user profiles from Supabase real-time
  useEffect(() => {
    const fetchApprovedCredentials = async () => {
      try {
        const { data, error } = await supabase
          .from('approved_credentials')
          .select('*');

        if (!error && data && data.length > 0) {
          const spCreds: ApprovedCredential[] = data.map((item: any) => ({
            id: item.id || `cred-${Date.now()}`,
            studentId: item.student_id || item.studentId || item.id,
            studentName: item.student_name || item.studentName || 'Student',
            studentEmail: item.student_email || item.studentEmail || '',
            studentPhoneNumber: item.student_phone_number || item.studentPhoneNumber || '',
            studentRegNo: item.student_reg_no || item.studentRegNo || item.student_phone_number || '',
            loginId: item.login_id || item.loginId || '',
            passcode: item.passcode || '',
            status: item.status || 'Approved',
            approvedAt: item.approved_at || item.approvedAt || 'Just now',
            utrRef: item.utr_ref || item.utrRef || '',
            isVerifiedStudent: item.is_verified_student ?? true,
          }));

          setApprovedCredentials((prev) => {
            const map = new Map<string, ApprovedCredential>();
            prev.forEach(c => map.set(c.id, c));
            spCreds.forEach(c => map.set(c.id, c));
            return Array.from(map.values());
          });
        }
      } catch (err) {
        console.warn("Supabase fetch approved_credentials warning:", err);
      }
    };

    const fetchUserProfiles = async () => {
      try {
        const { data: profData } = await supabase.from('user_profiles').select('*');
        const { data: regData } = await supabase.from('pending_registrations').select('*');

        const dbProfilesMap = new Map<string, StudentProfile>();

        if (profData && profData.length > 0) {
          profData.forEach((item: any) => {
            const phone = item.phone_number || item.reg_number || item.id;
            if (!phone) return;

            let g = 'female';
            if (item.gender) {
              g = item.gender.toString().toLowerCase();
            } else if (item.looking_for) {
              g = item.looking_for.toString().toLowerCase() === 'male' ? 'female' : 'male';
            }
            if (g !== 'female' && g !== 'male') g = 'female';

            let lf = item.looking_for ? item.looking_for.toString().toLowerCase() : (g === 'female' ? 'male' : 'female');

            dbProfilesMap.set(phone, {
              id: phone,
              name: item.full_name || 'Manipal Student',
              age: item.age || 21,
              gender: g as any,
              lookingFor: lf as any,
              major: item.major || 'Degree',
              year: item.year || '3rd Year',
              campus: item.campus || 'MIT Manipal',
              quote: item.quote || 'Looking for great coffee and friends!',
              bio: item.bio || 'Manipal student exploring campus life.',
              interests: item.interests || ['Coffee', 'Music'],
              verified: item.is_verified_student ?? true,
              avatarUrl: item.avatar_url || ASSETS.userAvatar,
              photos: [item.avatar_url || ASSETS.userAvatar],
              phoneNumber: item.phone_number,
              email: item.email,
            });
          });
        }

        if (regData && regData.length > 0) {
          regData.forEach((item: any) => {
            const phone = item.phone_number || item.id;
            if (!phone) return;
            if (!dbProfilesMap.has(phone)) {
              let g = 'female';
              if (item.gender) {
                g = item.gender.toString().toLowerCase();
              } else if (item.looking_for) {
                g = item.looking_for.toString().toLowerCase() === 'male' ? 'female' : 'male';
              }
              if (g !== 'female' && g !== 'male') g = 'female';

              let lf = item.looking_for ? item.looking_for.toString().toLowerCase() : (g === 'female' ? 'male' : 'female');

              dbProfilesMap.set(phone, {
                id: phone,
                name: item.student_name || 'Manipal Student',
                age: 21,
                gender: g as any,
                lookingFor: lf as any,
                major: item.major || 'Degree',
                year: '2nd Year',
                campus: 'MIT Manipal',
                quote: 'Looking for coffee and genuine connections!',
                bio: 'Manipal student looking for good company.',
                interests: ['Coffee', 'Music'],
                verified: true,
                avatarUrl: item.avatar_url || ASSETS.userAvatar,
                photos: [item.avatar_url || ASSETS.userAvatar],
                phoneNumber: item.phone_number,
                email: item.email,
              });
            }
          });
        }

        setProfiles((prev) => {
          const map = new Map<string, StudentProfile>();
          prev.forEach(p => map.set(p.id, p));
          dbProfilesMap.forEach((p, k) => map.set(k, p));
          return Array.from(map.values());
        });
      } catch (err) {
        console.warn("Supabase fetch user_profiles warning:", err);
      }
    };

    fetchApprovedCredentials();
    fetchUserProfiles();

    const channel = supabase
      .channel('approved_credentials_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'approved_credentials' }, () => {
        fetchApprovedCredentials();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_profiles' }, () => {
        fetchUserProfiles();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pending_registrations' }, () => {
        fetchUserProfiles();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Safe helper to save user profiles to Supabase (handles optional gender/looking_for columns seamlessly)
  const saveUserProfileToSupabase = async (details: {
    fullName: string;
    phoneNumber: string;
    regNumber?: string;
    email?: string;
    major?: string;
    year?: string;
    campus?: string;
    bio?: string;
    quote?: string;
    interests?: string[];
    avatarUrl?: string;
    gender?: string;
    lookingFor?: string;
    isVerifiedStudent?: boolean;
    loginId?: string;
  }) => {
    try {
      let resolvedGender = details.gender;
      let resolvedLookingFor = details.lookingFor;

      if (!resolvedGender) {
        try {
          const { data: existing } = await supabase
            .from('user_profiles')
            .select('gender, looking_for')
            .eq('phone_number', details.phoneNumber)
            .maybeSingle();

          if (existing && existing.gender) {
            resolvedGender = existing.gender;
            resolvedLookingFor = existing.looking_for;
          }
        } catch (e) {
          console.warn("Fetch existing gender error:", e);
        }
      }

      const payloadFull: any = {
        full_name: details.fullName,
        phone_number: details.phoneNumber,
        reg_number: details.regNumber || details.phoneNumber,
        email: details.email || '',
        major: details.major || '',
        year: details.year || '',
        campus: details.campus || '',
        bio: details.bio || '',
        quote: details.quote || '',
        interests: details.interests || [],
        avatar_url: details.avatarUrl || '',
        gender: resolvedGender || 'female',
        looking_for: resolvedLookingFor || 'male',
        login_id: details.loginId || '',
        verified: true,
        is_verified_student: details.isVerifiedStudent ?? true,
        updated_at: new Date().toISOString(),
      };

      const { error: fullErr } = await supabase
        .from('user_profiles')
        .upsert([payloadFull], { onConflict: 'phone_number' });

      if (fullErr) {
        // Fallback without gender/looking_for if schema hasn't migrated those columns
        const { gender, looking_for, ...payloadSafe } = payloadFull;
        await supabase
          .from('user_profiles')
          .upsert([payloadSafe], { onConflict: 'phone_number' });
      }
    } catch (err) {
      console.warn("saveUserProfileToSupabase caught warning:", err);
    }
  };

  // Handle Onboarding Submission -> Save profile to DB & Notify Admin
  const handleOnboardingDetailsSubmit = async (details: typeof userOnboardingData) => {
    setUserOnboardingData(details);

    await saveUserProfileToSupabase({
      fullName: details.fullName,
      phoneNumber: details.phoneNumber,
      regNumber: details.regNumber,
      email: details.email,
      major: details.major,
      year: details.year,
      campus: details.campus,
      bio: details.bio,
      quote: details.quote,
      interests: details.interests,
      avatarUrl: details.avatarUrl,
      gender: details.gender,
      lookingFor: details.lookingFor,
      isVerifiedStudent: false,
    });

    const newActivity: AdminActivity = {
      id: `act-${Date.now()}`,
      userName: details.fullName,
      action: `New Student Logged In (${details.major} • Phone: ${details.phoneNumber})`,
      status: 'Completed',
      time: 'Just now',
      avatarUrl: details.avatarUrl,
    };

    setAdminActivities((prev) => [newActivity, ...prev]);
    setAdminStats((prev) => ({ ...prev, totalUsers: prev.totalUsers + 1 }));

    // Move to verification/payment step
    setCurrentView('payment-step');
  };

  // Handle Payment Submission -> Notify Admin with Screenshot & UTR & Wait for Admin Approval
  const handlePaymentSubmit = (paymentData: {
    upiNumber: string;
    transactionRef: string;
    amount: string;
    screenshotUrl: string;
  }) => {
    setHasCampusPass(false);

    const paymentActivity: AdminActivity = {
      id: `act-pay-${Date.now()}`,
      userName: userOnboardingData.fullName,
      action: `Campus Pass Payment Screenshot Uploaded (${paymentData.amount})`,
      status: 'Pending Review',
      time: 'Just now',
      avatarUrl: userOnboardingData.avatarUrl,
      paymentDetails: {
        upiNumber: paymentData.upiNumber,
        transactionRef: paymentData.transactionRef,
        amount: paymentData.amount,
        screenshotUrl: paymentData.screenshotUrl,
        studentPhoneNumber: userOnboardingData.phoneNumber,
        studentEmail: userOnboardingData.email,
      },
    };

    setAdminActivities((prev) => [paymentActivity, ...prev]);
    setAdminStats((prev) => ({
      ...prev,
      pendingPayments: prev.pendingPayments + 1,
    }));

    // Redirect to awaiting approval & credential assignment screen
    setCurrentView('awaiting-approval');
  };

  // Handle Admin Approval & Credential Production (Supabase Live DB Operations & MAHE Validation)
  const handleApprovePaymentWithCredential = async (
    activityId: string,
    credential: { loginId: string; passcode: string }
  ) => {
    let act = adminActivities.find((a) => a.id === activityId);
    let studentName = act?.userName;
    let studentPhoneNumber = act?.paymentDetails?.studentPhoneNumber;
    let studentEmail = act?.paymentDetails?.studentEmail;
    let utrRef = act?.paymentDetails?.transactionRef;

    if (!studentName || !studentPhoneNumber) {
      try {
        const { data: reg } = await supabase.from('pending_registrations').select('*').eq('id', activityId).single();
        if (reg) {
          studentName = reg.student_name || reg.studentName;
          studentPhoneNumber = reg.phone_number || reg.phoneNumber;
          studentEmail = reg.email;
          utrRef = reg.transaction_ref || reg.transactionRef;
        }
      } catch (err) {
        console.warn("Fetch pending_registrations single error:", err);
      }
    }

    studentName = studentName || userOnboardingData.fullName;
    studentPhoneNumber = studentPhoneNumber || userOnboardingData.phoneNumber;
    const rawEmail =
      studentEmail ||
      userOnboardingData.email ||
      `${studentName.toLowerCase().replace(/\s+/g, '.')}@learner.manipal.edu`;
    const regNo = studentPhoneNumber;

    const emailLower = rawEmail.trim().toLowerCase();
    const isValidMAHE = emailLower.endsWith('@learner.manipal.edu') || emailLower.endsWith('@manipal.edu');
    const validatedEmail = isValidMAHE
      ? rawEmail.trim()
      : `${studentName.toLowerCase().replace(/\s+/g, '.')}@learner.manipal.edu`;

    const credentialId = `cred-${activityId}`;

    const newCredential: ApprovedCredential = {
      id: credentialId,
      studentId: activityId,
      studentName,
      studentEmail: validatedEmail,
      studentPhoneNumber,
      studentRegNo: regNo,
      loginId: credential.loginId,
      passcode: credential.passcode,
      status: 'Approved',
      approvedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      utrRef,
      isVerifiedStudent: true,
    };

    let studentGender = userOnboardingData.phoneNumber === studentPhoneNumber ? userOnboardingData.gender : undefined;
    let studentLookingFor = userOnboardingData.phoneNumber === studentPhoneNumber ? userOnboardingData.lookingFor : undefined;

    try {
      const { data: pData } = await supabase.from('user_profiles').select('*').eq('phone_number', studentPhoneNumber).maybeSingle();
      if (pData && pData.gender) {
        studentGender = pData.gender;
        studentLookingFor = pData.looking_for;
      }
    } catch (e) {}

    try {
      await supabase.from('approved_credentials').upsert([
        {
          id: credentialId,
          student_id: activityId,
          student_name: studentName,
          student_email: validatedEmail,
          student_phone_number: studentPhoneNumber,
          student_reg_no: regNo,
          login_id: credential.loginId,
          passcode: credential.passcode,
          status: 'Approved',
          approved_at: new Date().toISOString(),
          utr_ref: utrRef || '',
          is_verified_student: true,
        },
      ]);

      await supabase.from('pending_registrations').update({
        status: 'approved',
        login_id: credential.loginId,
        passcode: credential.passcode,
      }).eq('id', activityId);

      await saveUserProfileToSupabase({
        fullName: studentName,
        phoneNumber: studentPhoneNumber,
        regNumber: regNo,
        email: validatedEmail,
        loginId: credential.loginId,
        gender: studentGender,
        lookingFor: studentLookingFor,
        isVerifiedStudent: true,
      });
    } catch (err) {
      console.warn("Supabase approval save warning:", err);
    }

    setApprovedCredentials((prev) => [
      newCredential,
      ...prev.filter((c) => c.studentPhoneNumber !== studentPhoneNumber && c.id !== credentialId),
    ]);

    setAdminActivities((prev) =>
      prev.map((item) =>
        item.id === activityId
          ? {
              ...item,
              status: 'Completed',
              assignedCredential: { loginId: credential.loginId, passcode: credential.passcode },
            }
          : item
      )
    );

    setAdminStats((prev) => ({
      ...prev,
      verifiedStudents: prev.verifiedStudents + 1,
      paidMembers: prev.paidMembers + 1,
      pendingPayments: Math.max(0, prev.pendingPayments - 1),
    }));
  };

  // Handle Swipe Like
  const handleSwipeLike = async (student: StudentProfile) => {
    if (student.id === 'bhavya-1' || student.id === 'pragya-1') {
      setMatchedStudentForCelebration(student);
      
      const chatId = `${userOnboardingData.phoneNumber}_${student.id}`;
      try {
        await supabase.from('chats').upsert([
          {
            id: chatId,
            user_phone: userOnboardingData.phoneNumber,
            user_name: userOnboardingData.fullName,
            student_id: student.id,
            student_name: student.name,
            student_avatar: student.avatarUrl,
            updated_at: new Date().toISOString(),
          },
        ]);
      } catch (err) {
        console.warn("Supabase chat create warning:", err);
      }
      
      setMatches((prev) => {
        if (prev.some((m) => m.student.id === student.id)) return prev;
        const newMatch: MatchItem = {
          id: chatId,
          student,
          matchedAt: 'Just now',
          lastMessage: 'Hey! It is a match! 👋',
          lastMessageTime: 'Just now',
          unreadCount: 1,
          messages: [],
        };
        return [newMatch, ...prev];
      });
    }
  };

  const handleSuperLike = (student: StudentProfile) => {
    handleSwipeLike(student);
  };

  const handleSendMessage = (matchId: string, text: string) => {
    // This is handled directly in ChatDetailScreen now via Firebase
  };

  const handleSelectMatch = (match: MatchItem) => {
    setMatches((prev) =>
      prev.map((m) => (m.id === match.id ? { ...m, unreadCount: 0 } : m))
    );
    setSelectedMatch(match);
    setCurrentView('chat-detail');
  };

  const handleUpdateUserProfile = async (updated: Partial<typeof userOnboardingData>) => {
    const updatedData = {
      ...userOnboardingData,
      ...updated,
    };
    setUserOnboardingData(updatedData);

    await saveUserProfileToSupabase({
      fullName: updatedData.fullName,
      phoneNumber: updatedData.phoneNumber,
      email: updatedData.email,
      major: updatedData.major,
      year: updatedData.year,
      campus: updatedData.campus,
      bio: updatedData.bio,
      quote: updatedData.quote,
      avatarUrl: updatedData.avatarUrl,
      gender: updatedData.gender,
      lookingFor: updatedData.lookingFor,
    });
  };

  const displayedProfiles = profiles.filter((p) => {
    // Exclude current logged in user
    const isSelf =
      (userOnboardingData.phoneNumber && p.phoneNumber === userOnboardingData.phoneNumber) ||
      (userOnboardingData.fullName && p.name.toLowerCase() === userOnboardingData.fullName.toLowerCase());
    if (isSelf) return false;

    if (!userOnboardingData.lookingFor || userOnboardingData.lookingFor === 'everyone') {
      return true;
    }
    return p.gender === userOnboardingData.lookingFor;
  });

  const totalUnreadCount = matches.reduce((acc, curr) => acc + curr.unreadCount, 0);

  return (
    <div className="bg-[#1e0f10] text-[#f9dcdb] min-h-screen flex flex-col font-sans antialiased selection:bg-[#ff5260] selection:text-[#5b0011] relative overflow-x-hidden">
      {/* Dynamic Molten Metal Ambient Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <MoltenMetal
          color1="#5227FF"
          color2="#FF9FFC"
          color3="#FFFFFF"
          speed={0.35}
          scale={4}
          detail={3}
          glow={1.6}
          coreSize={0.1}
          swirl={1}
          fold={-0.2}
          blackPoint={0.05}
          brightness={1.3}
          colorMode="molten"
          grain={true}
          grainIntensity={0.05}
          mouseInteraction={true}
          mouseStrength={0.3}
        />
      </div>
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#FF4B5C"
      />

      <div className="relative z-10 flex flex-col min-h-screen">
      {/* Top Application Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        hasCampusPass={hasCampusPass}
        onOpenCampusPass={() => setShowCampusPassModal(true)}
        onOpenAdmin={() => setShowAdminPasscodeModal(true)}
        onOpenPreviews={() => setShowPreviewsModal(true)}
        onOpenStudentLogin={() => setShowStudentLoginModal(true)}
        userAvatarUrl={userOnboardingData.avatarUrl}
      />

      {/* Main Screen Views */}
      {currentView === 'splash' && (
        <SplashScreen
          onContinueWithGoogle={() => setCurrentView('onboarding-details')}
          onOpenHowItWorks={() => setShowHowItWorksModal(true)}
          onOpenAdmin={() => setShowAdminPasscodeModal(true)}
          onOpenStudentLogin={() => setShowStudentLoginModal(true)}
          onPlayIntroClip={() => setShowIntroOverlay(true)}
        />
      )}

      {currentView === 'onboarding-details' && (
        <OnboardingDetailsScreen
          onSubmitDetails={handleOnboardingDetailsSubmit}
          onBackToSplash={() => setCurrentView('splash')}
        />
      )}

      {currentView === 'verify' && (
        <VerificationScreen
          studentEmail={userOnboardingData.email}
          onVerifiedContinue={() => setCurrentView('payment-step')}
          onOpenTerms={() => setModalTermsType('terms')}
          onOpenGuidelines={() => setModalTermsType('guidelines')}
        />
      )}

      {currentView === 'payment-step' && (
        <PaymentStepScreen
          studentName={userOnboardingData.fullName}
          phoneNumber={userOnboardingData.phoneNumber}
          email={userOnboardingData.email}
          onCompletePayment={handlePaymentSubmit}
          onBackToDetails={() => setCurrentView('onboarding-details')}
        />
      )}

      {currentView === 'awaiting-approval' && (
        <AwaitingApprovalScreen
          studentName={userOnboardingData.fullName}
          regNumber={userOnboardingData.phoneNumber}
          transactionRef={
            adminActivities.find((a) => a.userName === userOnboardingData.fullName)?.paymentDetails
              ?.transactionRef || ''
          }
          approvedCredentials={approvedCredentials}
          onLoginSuccess={async (cred) => {
            setHasCampusPass(true);

            let sName = cred.studentName || userOnboardingData.fullName;
            let sPhone = cred.studentPhoneNumber || cred.loginId || userOnboardingData.phoneNumber;
            let sEmail = cred.studentEmail || userOnboardingData.email;
            let sGender = cred.gender || userOnboardingData.gender;
            let sLookingFor = cred.lookingFor || userOnboardingData.lookingFor;
            let sMajor = cred.major || userOnboardingData.major;
            let sCampus = cred.campus || userOnboardingData.campus;
            let sBio = cred.bio || userOnboardingData.bio;
            let sQuote = cred.quote || userOnboardingData.quote;
            let sAvatar = cred.avatarUrl || userOnboardingData.avatarUrl;

            try {
              const { data: dbProf } = await supabase
                .from('user_profiles')
                .select('*')
                .or(`phone_number.eq.${sPhone},login_id.eq.${cred.loginId}`)
                .limit(1);

              if (dbProf && dbProf.length > 0) {
                const found = dbProf[0];
                if (found.full_name) sName = found.full_name;
                if (found.phone_number) sPhone = found.phone_number;
                if (found.email) sEmail = found.email;
                if (found.gender) sGender = found.gender;
                if (found.looking_for) sLookingFor = found.looking_for;
                if (found.major) sMajor = found.major;
                if (found.campus) sCampus = found.campus;
                if (found.bio) sBio = found.bio;
                if (found.quote) sQuote = found.quote;
                if (found.avatar_url) sAvatar = found.avatar_url;
              }
            } catch (err) {
              console.warn("User profile fetch on awaiting approval login error:", err);
            }

            setUserOnboardingData({
              fullName: sName,
              phoneNumber: sPhone,
              regNumber: sPhone,
              email: sEmail,
              gender: sGender as any,
              lookingFor: sLookingFor as any,
              major: sMajor,
              year: userOnboardingData.year || '2nd Year',
              campus: sCampus,
              bio: sBio,
              quote: sQuote,
              interests: userOnboardingData.interests || ['Coffee', 'Music'],
              avatarUrl: sAvatar,
            });

            setCurrentView('discover');
          }}
          onOpenAdmin={() => setShowAdminPasscodeModal(true)}
        />
      )}

      {currentView === 'discover' && (
        <DiscoverScreen
          profiles={displayedProfiles}
          onSwipeLike={handleSwipeLike}
          onSwipePass={() => {}}
          onSuperLike={handleSuperLike}
          onOpenCampusPass={() => setShowCampusPassModal(true)}
          hasCampusPass={hasCampusPass}
        />
      )}

      {currentView === 'chats' && (
        <ChatsScreen
          matches={matches}
          onSelectMatch={handleSelectMatch}
          onOpenCampusPass={() => setShowCampusPassModal(true)}
        />
      )}

      {currentView === 'chat-detail' && selectedMatch && (
        <ChatDetailScreen
          match={matches.find((m) => m.id === selectedMatch.id) || selectedMatch}
          onBack={() => setCurrentView('chats')}
          onSendMessage={handleSendMessage}
        />
      )}

      {currentView === 'crush' && (
        <SecretCrushScreen
          onOpenCampusPass={() => setShowCampusPassModal(true)}
          hasCampusPass={hasCampusPass}
        />
      )}

      {currentView === 'profile' && (
        <UserProfileScreen
          userProfile={userOnboardingData}
          onUpdateProfile={handleUpdateUserProfile}
          onOpenCampusPass={() => setShowCampusPassModal(true)}
          hasCampusPass={hasCampusPass}
          onOpenAdmin={() => setShowAdminPasscodeModal(true)}
        />
      )}

      {currentView === 'admin' && (
        <AdminPanel
          stats={adminStats}
          activities={adminActivities}
          approvedCredentials={approvedCredentials}
          onClose={() => setCurrentView('discover')}
          onApprovePaymentWithCredential={handleApprovePaymentWithCredential}
        />
      )}

      {/* Side Floating Glass Navigation Bar */}
      <SideNav
        currentView={currentView}
        setCurrentView={setCurrentView}
        unreadMessagesCount={totalUnreadCount}
      />

      {/* Screen Modals */}

      {/* Match Celebration Modal */}
      {matchedStudentForCelebration && (
        <MatchCelebrationModal
          matchedStudent={matchedStudentForCelebration}
          onSendMessage={(student) => {
            const match = matches.find((m) => m.student.id === student.id);
            if (match) {
              setSelectedMatch(match);
              setCurrentView('chat-detail');
            } else {
              setCurrentView('chats');
            }
            setMatchedStudentForCelebration(null);
          }}
          onKeepDiscovering={() => {
            setMatchedStudentForCelebration(null);
            setCurrentView('discover');
          }}
        />
      )}

      {/* Campus Pass Paywall Modal */}
      {showCampusPassModal && (
        <CampusPassModal
          onClose={() => setShowCampusPassModal(false)}
          hasCampusPass={hasCampusPass}
          onUnlockPass={() => setHasCampusPass(true)}
        />
      )}

      {/* How It Works Modal */}
      {showHowItWorksModal && (
        <HowItWorksModal
          onClose={() => setShowHowItWorksModal(false)}
          onContinue={() => {
            setShowHowItWorksModal(false);
            setCurrentView('onboarding-details');
          }}
        />
      )}

      {/* Terms & Guidelines Modal */}
      {modalTermsType && (
        <TermsAndGuidelinesModal
          title={modalTermsType === 'terms' ? 'Terms & Privacy Policy' : 'Community Guidelines'}
          type={modalTermsType}
          onClose={() => setModalTermsType(null)}
        />
      )}

      {/* Campus Previews Gallery Modal */}
      {showPreviewsModal && (
        <CampusPreviewsModal
          onClose={() => setShowPreviewsModal(false)}
          onStartRegistration={() => {
            setShowPreviewsModal(false);
            setCurrentView('onboarding-details');
          }}
        />
      )}

      {/* Admin Passcode Modal (Code: 3000) */}
      {showAdminPasscodeModal && (
        <AdminPasscodeModal
          onClose={() => setShowAdminPasscodeModal(false)}
          onSuccess={() => {
            setShowAdminPasscodeModal(false);
            setCurrentView('admin');
          }}
        />
      )}

      {/* Student Login Dialogue Modal */}
      {showStudentLoginModal && (
        <StudentLoginModal
          onClose={() => setShowStudentLoginModal(false)}
          approvedCredentials={approvedCredentials}
          onLoginSuccess={async (cred) => {
            setHasCampusPass(true);

            let sName = cred.studentName || cred.loginId;
            let sPhone = cred.studentPhoneNumber || cred.loginId;
            let sEmail = cred.studentEmail || `${sName.toLowerCase().replace(/\s+/g, '.')}@learner.manipal.edu`;
            let sGender = cred.gender;
            let sLookingFor = cred.lookingFor;
            let sMajor = cred.major;
            let sCampus = cred.campus;
            let sBio = cred.bio;
            let sQuote = cred.quote;
            let sAvatar = cred.avatarUrl;

            try {
              const { data: dbProf } = await supabase
                .from('user_profiles')
                .select('*')
                .or(`phone_number.eq.${sPhone},full_name.ilike.${sName},login_id.eq.${cred.loginId}`)
                .limit(1);

              if (dbProf && dbProf.length > 0) {
                const found = dbProf[0];
                sName = found.full_name || sName;
                sPhone = found.phone_number || sPhone;
                sEmail = found.email || sEmail;
                sGender = found.gender || sGender;
                sLookingFor = found.looking_for || sLookingFor;
                sMajor = found.major || sMajor;
                sCampus = found.campus || sCampus;
                sBio = found.bio || sBio;
                sQuote = found.quote || sQuote;
                sAvatar = found.avatar_url || sAvatar;
              }
            } catch (err) {
              console.warn("Supabase login profile fetch warning:", err);
            }

            const userGender = sGender || (sName?.toLowerCase().includes('anya') ? 'female' : 'male');
            const userLookingFor = sLookingFor || (userGender === 'female' ? 'male' : 'female');

            const newUserData = {
              fullName: sName,
              phoneNumber: sPhone,
              email: sEmail,
              gender: userGender as any,
              lookingFor: userLookingFor as any,
              major: sMajor || 'B.Tech Computer Science',
              year: '3rd Year',
              campus: sCampus || 'MIT Manipal',
              bio: sBio || 'Tech enthusiast, late night coder & End Point sunset lover.',
              quote: sQuote || 'Always looking for good coffee at Astra.',
              avatarUrl: sAvatar || ASSETS.userAvatar,
              interests: userOnboardingData.interests,
            };

            setUserOnboardingData(newUserData);
            saveUserProfileToSupabase(newUserData);

            setShowStudentLoginModal(false);
            setCurrentView('discover');
          }}
          onNavigateToOnboarding={() => {
            setShowStudentLoginModal(false);
            setCurrentView('onboarding-details');
          }}
        />
      )}

      {/* Animated Video Intro Overlay */}
      {showIntroOverlay && (
        <IntroVideoOverlay onFinish={() => setShowIntroOverlay(false)} />
      )}
      </div>
    </div>
  );
}

