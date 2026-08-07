import React, { useState } from 'react';
import { ViewScreen, StudentProfile, MatchItem, AdminStats, AdminActivity, ApprovedCredential } from './types';
import {
  INITIAL_PROFILES,
  INITIAL_MATCHES,
  INITIAL_ADMIN_STATS,
  INITIAL_ADMIN_ACTIVITIES,
  ASSETS,
} from './data/studentProfiles';

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
import { BottomNav } from './components/BottomNav';
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
    regNumber: string;
    email: string;
    major: string;
    year: string;
    campus: string;
    bio: string;
    quote: string;
    interests: string[];
    avatarUrl: string;
  }>({
    fullName: 'Alex Sharma',
    regNumber: '220911048',
    email: 'alex.sharma@manipal.edu',
    major: 'B.Tech Mechanical',
    year: '3rd Year',
    campus: 'MIT Manipal',
    bio: 'Formula student team & coffee lover.',
    quote: 'Always looking for good coffee at Astra.',
    interests: ['Coffee', 'Music', 'Coding'],
    avatarUrl: ASSETS.userAvatar,
  });

  const [adminStats, setAdminStats] = useState<AdminStats>(INITIAL_ADMIN_STATS);
  const [adminActivities, setAdminActivities] = useState<AdminActivity[]>(INITIAL_ADMIN_ACTIVITIES);
  const [approvedCredentials, setApprovedCredentials] = useState<ApprovedCredential[]>([
    {
      id: 'cred-sample',
      studentId: 'user-sample',
      studentName: 'Alex Sharma',
      studentEmail: 'alex.sharma@manipal.edu',
      studentRegNo: '220911048',
      loginId: 'MPL-2026-8812',
      passcode: 'Campus#8812',
      status: 'Approved',
      approvedAt: 'Yesterday',
      utrRef: '982144510298',
    },
  ]);

  // Handle Onboarding Submission -> Notify Admin
  const handleOnboardingDetailsSubmit = (details: typeof userOnboardingData) => {
    setUserOnboardingData(details);

    // Notify Admin of login/registration
    const newActivity: AdminActivity = {
      id: `act-${Date.now()}`,
      userName: details.fullName,
      action: `New Student Logged In (${details.major} • Reg: ${details.regNumber})`,
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
    // Payment status is pending until Admin approves and produces credentials
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
        studentRegNo: userOnboardingData.regNumber,
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

  // Handle Admin Approval & Credential Production
  const handleApprovePaymentWithCredential = (
    activityId: string,
    credential: { loginId: string; passcode: string }
  ) => {
    const act = adminActivities.find((a) => a.id === activityId);
    const studentName = act?.userName || userOnboardingData.fullName;
    const studentRegNo = act?.paymentDetails?.studentRegNo || userOnboardingData.regNumber;
    const utrRef = act?.paymentDetails?.transactionRef;

    const newCredential: ApprovedCredential = {
      id: `cred-${Date.now()}`,
      studentId: activityId,
      studentName,
      studentEmail:
        act?.paymentDetails?.studentEmail ||
        `${studentName.toLowerCase().replace(/\s+/g, '.')}@manipal.edu`,
      studentRegNo,
      loginId: credential.loginId,
      passcode: credential.passcode,
      status: 'Approved',
      approvedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      utrRef,
    };

    setApprovedCredentials((prev) => [
      newCredential,
      ...prev.filter((c) => c.studentRegNo !== studentRegNo),
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
  const handleSwipeLike = (student: StudentProfile) => {
    if (student.id === '1' || student.id === '2') {
      setMatchedStudentForCelebration(student);
      
      setMatches((prev) => {
        if (prev.some((m) => m.student.id === student.id)) return prev;
        const newMatch: MatchItem = {
          id: `match-${student.id}`,
          student,
          matchedAt: 'Just now',
          lastMessage: 'Hey! It is a match! 👋',
          lastMessageTime: 'Just now',
          unreadCount: 1,
          messages: [
            {
              id: `msg-${Date.now()}`,
              senderId: student.id,
              text: `Hey! It is a match! Saw you on Mingle@Manipal 🎉`,
              timestamp: 'Just now',
              isUser: false,
            },
          ],
        };
        return [newMatch, ...prev];
      });
    }
  };

  const handleSuperLike = (student: StudentProfile) => {
    handleSwipeLike(student);
  };

  const handleSendMessage = (matchId: string, text: string) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id !== matchId) return m;

        const userMsg = {
          id: `msg-${Date.now()}`,
          senderId: 'user',
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isUser: true,
        };

        const updatedMessages = [...m.messages, userMsg];

        setTimeout(() => {
          setMatches((currentMatches) =>
            currentMatches.map((item) => {
              if (item.id !== matchId) return item;
              const responses = [
                `That sounds awesome! Are you heading to Kamath canteen or Astra later? ☕`,
                `Haha completely agree! We should definitely catch up after classes. 😊`,
                `Nice! KMC library or End Point is great for sunset hangs.`,
              ];
              const replyText = responses[Math.floor(Math.random() * responses.length)];
              const replyMsg = {
                id: `reply-${Date.now()}`,
                senderId: item.student.id,
                text: replyText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isUser: false,
              };
              return {
                ...item,
                messages: [...item.messages, replyMsg],
                lastMessage: replyText,
                lastMessageTime: 'Just now',
              };
            })
          );
        }, 1500);

        return {
          ...m,
          messages: updatedMessages,
          lastMessage: text,
          lastMessageTime: 'Just now',
          unreadCount: 0,
        };
      })
    );
  };

  const handleSelectMatch = (match: MatchItem) => {
    setMatches((prev) =>
      prev.map((m) => (m.id === match.id ? { ...m, unreadCount: 0 } : m))
    );
    setSelectedMatch(match);
    setCurrentView('chat-detail');
  };

  const totalUnreadCount = matches.reduce((acc, curr) => acc + curr.unreadCount, 0);

  return (
    <div className="bg-[#1e0f10] text-[#f9dcdb] min-h-screen flex flex-col font-sans antialiased selection:bg-[#ff5260] selection:text-[#5b0011] relative overflow-x-hidden">
      {/* Dynamic Molten Metal Ambient Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-45">
        <MoltenMetal
          color1="#FF4B5C"
          color2="#6C4AB6"
          color3="#FFD1DC"
          speed={0.25}
          scale={3.5}
          detail={3}
          glow={1.8}
          coreSize={0.12}
          swirl={1.2}
          fold={-0.25}
          blackPoint={0.08}
          brightness={1.2}
          grain={true}
          grainIntensity={0.04}
          opacity={0.8}
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
        COLOR="#A855F7"
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
          onVerifiedContinue={() => setCurrentView('payment-step')}
          onOpenTerms={() => setModalTermsType('terms')}
          onOpenGuidelines={() => setModalTermsType('guidelines')}
        />
      )}

      {currentView === 'payment-step' && (
        <PaymentStepScreen
          studentName={userOnboardingData.fullName}
          regNumber={userOnboardingData.regNumber}
          email={userOnboardingData.email}
          onCompletePayment={handlePaymentSubmit}
          onBackToDetails={() => setCurrentView('onboarding-details')}
        />
      )}

      {currentView === 'awaiting-approval' && (
        <AwaitingApprovalScreen
          studentName={userOnboardingData.fullName}
          regNumber={userOnboardingData.regNumber}
          transactionRef={
            adminActivities.find((a) => a.userName === userOnboardingData.fullName)?.paymentDetails
              ?.transactionRef || ''
          }
          approvedCredentials={approvedCredentials}
          onLoginSuccess={(cred) => {
            setHasCampusPass(true);
            setCurrentView('discover');
          }}
          onOpenAdmin={() => setShowAdminPasscodeModal(true)}
        />
      )}

      {currentView === 'discover' && (
        <DiscoverScreen
          profiles={profiles}
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

      {/* Bottom Floating Glass Navigation Bar */}
      <BottomNav
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
          onLoginSuccess={(cred) => {
            setHasCampusPass(true);
            setUserOnboardingData((prev) => ({
              ...prev,
              fullName: cred.name,
              regNumber: cred.loginId,
            }));
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

