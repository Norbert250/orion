import React, { useState } from 'react';
import { 
  Menu,
  CreditCard,
  DollarSign,
  Briefcase,
  Home,
  Camera,
  Calendar,
  User,
  Phone,
  MapPin,
  FileText,
  CheckCircle,
  Clock,
  HelpCircle,
  Upload,
  Building2,
  Store,
  X,
  ArrowLeft
} from 'lucide-react';

const LoanApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showSectorModal, setShowSectorModal] = useState(false);
  const [selectedSector, setSelectedSector] = useState('');
  const [uploadedAssets, setUploadedAssets] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    repaymentDate: '',
    hasRetailBusiness: false,
    businessRegNumber: '',
    businessLocation: '',
    guarantor1: { name: '', id: '', contact: '' },
    guarantor2: { name: '', id: '', contact: '' },
    allowPermissions: false,
  });

  // Color palette
  const colors = {
    primary: '#6366F1',
    primaryLight: '#8B5CF6',
    secondary: '#EC4899',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    accent: '#3B82F6',
  };

  // Styles object
  const styles = {
    app: {
      maxWidth: '390px',
      margin: '0 auto',
      background: colors.background,
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    },
    screen: {
      minHeight: '100vh',
      background: colors.background,
    },
    header: {
      background: colors.surface,
      borderBottom: `1px solid ${colors.border}`,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 20px',
      height: '60px',
    },
    headerTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: colors.text,
      margin: 0,
    },
    button: {
      background: 'none',
      border: 'none',
      padding: '4px',
      cursor: 'pointer',
      color: colors.text,
      borderRadius: '8px',
      transition: 'background 0.2s',
    },
    scrollContent: {
      paddingBottom: '20px',
    },
    welcomeSection: {
      textAlign: 'center',
      padding: '40px 20px',
    },
    welcomeIcon: {
      width: '80px',
      height: '80px',
      borderRadius: '40px',
      background: `${colors.primary}20`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
    },
    welcomeTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: colors.text,
      margin: '0 0 8px',
    },
    welcomeSubtitle: {
      fontSize: '16px',
      color: colors.textSecondary,
      lineHeight: '1.5',
      margin: 0,
    },
    buttonContainer: {
      padding: '0 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    primaryButton: {
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
      color: 'white',
      border: 'none',
      padding: '18px 24px',
      borderRadius: '16px',
      fontSize: '18px',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: `0 4px 16px ${colors.primary}40`,
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    secondaryButton: {
      background: colors.surface,
      color: colors.primary,
      border: `2px solid ${colors.primary}`,
      padding: '16px 24px',
      borderRadius: '16px',
      fontSize: '18px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    buttonContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    featuresSection: {
      padding: '40px 20px 0',
    },
    sectionTitle: {
      fontSize: '22px',
      fontWeight: '600',
      color: colors.text,
      margin: '0 0 16px',
    },
    featuresList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px 0',
      fontSize: '16px',
      color: colors.textSecondary,
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      zIndex: 1000,
    },
    modalContent: {
      background: colors.surface,
      borderRadius: '20px',
      padding: '24px',
      width: '100%',
      maxWidth: '400px',
      position: 'relative',
    },
    modalClose: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: colors.textSecondary,
    },
    modalTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      margin: '0 0 8px',
    },
    modalSubtitle: {
      fontSize: '16px',
      color: colors.textSecondary,
      textAlign: 'center',
      margin: '0 0 24px',
    },
    sectorButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    sectorButton: {
      background: colors.background,
      border: `2px solid ${colors.border}`,
      padding: '20px',
      borderRadius: '16px',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'all 0.2s',
    },
    progressContainer: {
      padding: '16px 20px',
      background: colors.surface,
      borderBottom: `1px solid ${colors.border}`,
    },
    progressBar: {
      height: '4px',
      background: colors.border,
      borderRadius: '2px',
      overflow: 'hidden',
      marginBottom: '8px',
    },
    progressFill: {
      height: '100%',
      background: colors.primary,
      borderRadius: '2px',
      transition: 'width 0.3s ease',
    },
    progressText: {
      fontSize: '14px',
      color: colors.textSecondary,
      textAlign: 'center',
      margin: 0,
    },
    formContent: {
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    section: {
      background: colors.surface,
      padding: '20px',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    inputLabel: {
      fontSize: '16px',
      fontWeight: '500',
      color: colors.text,
    },
    required: {
      color: colors.error,
    },
    inputWrapper: {
      display: 'flex',
      alignItems: 'center',
      background: colors.background,
      borderRadius: '12px',
      border: `1px solid ${colors.border}`,
      transition: 'border-color 0.2s',
    },
    inputIcon: {
      paddingLeft: '16px',
    },
    input: {
      flex: 1,
      padding: '16px',
      border: 'none',
      background: 'none',
      fontSize: '16px',
      color: colors.text,
      outline: 'none',
    },
    uploadGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      marginBottom: '16px',
    },
    assetUploadBox: {
      height: '100px',
      background: colors.background,
      border: `2px dashed ${colors.border}`,
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      cursor: 'pointer',
      transition: 'border-color 0.2s',
    },
    uploadButton: {
      background: colors.background,
      border: `1px solid ${colors.border}`,
      padding: '12px 16px',
      borderRadius: '12px',
      cursor: 'pointer',
      width: '100%',
      transition: 'all 0.2s',
    },
    uploadContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      color: colors.text,
    },
    toggleSwitch: {
      width: '48px',
      height: '24px',
      borderRadius: '12px',
      background: colors.border,
      position: 'relative',
      cursor: 'pointer',
      transition: 'background 0.2s',
    },
    toggleSwitchChecked: {
      background: colors.primary,
    },
    toggleThumb: {
      width: '20px',
      height: '20px',
      borderRadius: '10px',
      background: 'white',
      position: 'absolute',
      top: '2px',
      left: '2px',
      transition: 'transform 0.2s',
    },
    toggleThumbChecked: {
      transform: 'translateX(24px)',
    },
    permissionRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
    },
    permissionInfo: {
      flex: 1,
    },
    permissionLabel: {
      fontSize: '16px',
      fontWeight: '500',
      color: colors.text,
      display: 'block',
      marginBottom: '4px',
    },
    permissionSubtext: {
      fontSize: '14px',
      color: colors.textSecondary,
      margin: 0,
    },
    submitButton: {
      background: colors.primary,
      color: 'white',
      border: 'none',
      padding: '16px 24px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background 0.2s',
    },
    pendingContent: {
      padding: '40px 20px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px',
    },
    pendingIcon: {
      width: '100px',
      height: '100px',
      borderRadius: '50px',
      background: `${colors.warning}20`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pendingTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      margin: 0,
    },
    statusCard: {
      background: colors.surface,
      padding: '20px',
      borderRadius: '16px',
      width: '100%',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    statusRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 0',
      borderBottom: `1px solid ${colors.border}`,
    },
    statusLabel: {
      fontSize: '16px',
      color: colors.textSecondary,
    },
    statusValue: {
      fontSize: '16px',
      fontWeight: '500',
      color: colors.text,
    },
    statusBadge: {
      background: `${colors.warning}20`,
      color: colors.warning,
      padding: '4px 8px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
    },
    supportButton: {
      background: colors.accent,
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'background 0.2s',
    },
  };

  // Header Component
  const Header = ({ title, showMenu = false, showBack = false, onBack }) => (
    <div style={styles.header}>
      <div style={styles.headerContent}>
        {showBack && (
          <button style={styles.button} onClick={onBack}>
            <ArrowLeft size={24} />
          </button>
        )}
        <h1 style={styles.headerTitle}>{title}</h1>
        {showMenu && (
          <button style={styles.button}>
            <Menu size={24} />
          </button>
        )}
      </div>
    </div>
  );

  // Toggle Switch Component
  const ToggleSwitch = ({ checked, onChange }) => (
    <div 
      style={{
        ...styles.toggleSwitch,
        ...(checked ? styles.toggleSwitchChecked : {})
      }}
      onClick={() => onChange(!checked)}
    >
      <div style={{
        ...styles.toggleThumb,
        ...(checked ? styles.toggleThumbChecked : {})
      }} />
    </div>
  );

  // Input Field Component
  const InputField = ({ label, value, onChange, placeholder, icon, type = 'text', required = false }) => (
    <div style={styles.inputContainer}>
      <label style={styles.inputLabel}>
        {label} {required && <span style={styles.required}>*</span>}
      </label>
      <div style={styles.inputWrapper}>
        {icon && <div style={styles.inputIcon}>{icon}</div>}
        <input
          style={{
            ...styles.input,
            ...(icon ? { paddingLeft: '8px' } : {})
          }}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );

  // Upload Button Component
  const UploadButton = ({ title, onClick, uploaded = false }) => (
    <button 
      style={{
        ...styles.uploadButton,
        ...(uploaded ? { 
          borderColor: colors.success, 
          background: `${colors.success}10` 
        } : {})
      }}
      onClick={onClick}
    >
      <div style={styles.uploadContent}>
        {uploaded ? (
          <CheckCircle size={20} color={colors.success} />
        ) : (
          <Upload size={20} color={colors.primary} />
        )}
        <span style={{ color: uploaded ? colors.success : colors.text }}>
          {uploaded ? 'Uploaded ✓' : title}
        </span>
      </div>
    </button>
  );

  // Progress Bar Component
  const ProgressBar = ({ currentStep, totalSteps }) => (
    <div style={styles.progressContainer}>
      <div style={styles.progressBar}>
        <div 
          style={{
            ...styles.progressFill,
            width: `${(currentStep / totalSteps) * 100}%`
          }}
        />
      </div>
      <p style={styles.progressText}>
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );

  // Home Screen
  const HomeScreen = () => (
    <div style={styles.screen}>
      <Header title="Loan Services" showMenu={true} />
      
      <div style={styles.scrollContent}>
        <div style={styles.welcomeSection}>
          <div style={styles.welcomeIcon}>
            <CreditCard size={40} color={colors.primary} />
          </div>
          <h2 style={styles.welcomeTitle}>Welcome to Loan Services</h2>
          <p style={styles.welcomeSubtitle}>
            Quick and reliable financial solutions for your needs
          </p>
        </div>

        <div style={styles.buttonContainer}>
          <button
            style={styles.primaryButton}
            onClick={() => setShowSectorModal(true)}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = `0 6px 20px ${colors.primary}50`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = `0 4px 16px ${colors.primary}40`;
            }}
          >
            <div style={styles.buttonContent}>
              <DollarSign size={24} />
              <span>Request Loan</span>
            </div>
          </button>

          <button
            style={styles.secondaryButton}
            onClick={() => alert('Payment feature coming soon!')}
            onMouseEnter={(e) => {
              e.target.style.background = colors.primary;
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = colors.surface;
              e.target.style.color = colors.primary;
            }}
          >
            <div style={styles.buttonContent}>
              <CreditCard size={24} />
              <span>Pay Loan</span>
            </div>
          </button>
        </div>

        <div style={styles.featuresSection}>
          <h3 style={styles.sectionTitle}>Why Choose Us?</h3>
          <div style={styles.featuresList}>
            <div style={styles.featureItem}>
              <CheckCircle size={20} color={colors.success} />
              <span>Quick approval process</span>
            </div>
            <div style={styles.featureItem}>
              <CheckCircle size={20} color={colors.success} />
              <span>Flexible repayment options</span>
            </div>
            <div style={styles.featureItem}>
              <CheckCircle size={20} color={colors.success} />
              <span>Competitive interest rates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sector Selection Modal */}
      {showSectorModal && (
        <div style={styles.modalOverlay} onClick={() => setShowSectorModal(false)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button 
              style={styles.modalClose}
              onClick={() => setShowSectorModal(false)}
            >
              <X size={24} />
            </button>
            
            <h2 style={styles.modalTitle}>Select Your Sector</h2>
            <p style={styles.modalSubtitle}>
              Are you from the Formal or Informal Sector?
            </p>

            <div style={styles.sectorButtons}>
              <button
                style={styles.sectorButton}
                onClick={() => {
                  setSelectedSector('formal');
                  setCurrentScreen('formalForm');
                  setShowSectorModal(false);
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = colors.primary;
                  e.target.style.background = `${colors.primary}10`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.background = colors.background;
                }}
              >
                <Briefcase size={32} color={colors.primary} />
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.text, margin: '8px 0 4px' }}>
                  Formal
                </h3>
                <p style={{ fontSize: '14px', color: colors.textSecondary, margin: 0 }}>
                  Employed with regular salary
                </p>
              </button>

              <button
                style={styles.sectorButton}
                onClick={() => {
                  setSelectedSector('informal');
                  setCurrentScreen('informalForm');
                  setShowSectorModal(false);
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = colors.secondary;
                  e.target.style.background = `${colors.secondary}10`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.background = colors.background;
                }}
              >
                <Store size={32} color={colors.secondary} />
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.text, margin: '8px 0 4px' }}>
                  Informal
                </h3>
                <p style={{ fontSize: '14px', color: colors.textSecondary, margin: 0 }}>
                  Self-employed or small business
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Informal Form Screen
  const InformalFormScreen = () => {
    return (
      <div style={styles.screen}>
        <Header 
          title="Informal Sector Loan Request" 
          showBack={true}
          onBack={() => setCurrentScreen('home')}
        />
        <ProgressBar currentStep={1} totalSteps={4} />
        
        <div style={styles.formContent}>
          {/* Asset Upload Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Upload Asset Photos</h3>
            <p style={{ fontSize: '14px', color: colors.textSecondary, margin: '-8px 0 8px' }}>
              Upload 3-10 pictures of your most valuable assets
            </p>
            
            <div style={styles.uploadGrid}>
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  style={styles.assetUploadBox}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = colors.border;
                  }}
                >
                  <Camera size={24} color={colors.textSecondary} />
                  <span style={{ fontSize: '14px', color: colors.textSecondary }}>
                    Asset {i}
                  </span>
                </div>
              ))}
            </div>
            
            <UploadButton 
              title="Upload Home Floor Photo" 
              onClick={() => alert('Photo upload feature')}
            />
          </div>

          {/* Permissions Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Permissions</h3>
            <div style={styles.permissionRow}>
              <div style={styles.permissionInfo}>
                <span style={styles.permissionLabel}>
                  Allow access to messages and call logs
                </span>
                <p style={styles.permissionSubtext}>
                  Used for verification purposes only
                </p>
              </div>
              <ToggleSwitch
                checked={formData.allowPermissions}
                onChange={(value) => 
                  setFormData(prev => ({ ...prev, allowPermissions: value }))
                }
              />
            </div>
          </div>

          {/* Loan Details */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Loan Details</h3>
            
            <InputField
              label="Amount Requested"
              value={formData.amount}
              onChange={(value) => setFormData(prev => ({ ...prev, amount: value }))}
              placeholder="Enter amount"
              icon={<DollarSign size={16} color={colors.textSecondary} />}
              type="number"
              required
            />

            <InputField
              label="Repayment Date"
              value={formData.repaymentDate}
              onChange={(value) => setFormData(prev => ({ ...prev, repaymentDate: value }))}
              placeholder="Select date"
              icon={<Calendar size={16} color={colors.textSecondary} />}
              type="date"
              required
            />

            <UploadButton 
              title="Upload Proof of Illness" 
              onClick={() => alert('Document upload feature')}
            />
          </div>

          {/* Business Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Business Information</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ToggleSwitch
                checked={formData.hasRetailBusiness}
                onChange={(value) => 
                  setFormData(prev => ({ ...prev, hasRetailBusiness: value }))
                }
              />
              <span style={{ fontSize: '16px', color: colors.text }}>
                Do you own a retail business?
              </span>
            </div>

            {formData.hasRetailBusiness && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                <InputField
                  label="Business Registration Number"
                  value={formData.businessRegNumber}
                  onChange={(value) => setFormData(prev => ({ ...prev, businessRegNumber: value }))}
                  placeholder="Enter registration number"
                  icon={<Building2 size={16} color={colors.textSecondary} />}
                />

                <InputField
                  label="Business Location"
                  value={formData.businessLocation}
                  onChange={(value) => setFormData(prev => ({ ...prev, businessLocation: value }))}
                  placeholder="Enter business address"
                  icon={<MapPin size={16} color={colors.textSecondary} />}
                />

                <UploadButton 
                  title="Upload Shop Picture" 
                  onClick={() => alert('Shop photo upload feature')}
                />
              </div>
            )}
          </div>

          {/* Guarantors Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Guarantors</h3>
            
            {/* Guarantor 1 */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: colors.text, margin: '0 0 16px' }}>
                Guarantor 1
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <InputField
                  label="Full Name"
                  value={formData.guarantor1.name}
                  onChange={(value) => 
                    setFormData(prev => ({ 
                      ...prev, 
                      guarantor1: { ...prev.guarantor1, name: value }
                    }))
                  }
                  placeholder="Enter full name"
                  icon={<User size={16} color={colors.textSecondary} />}
                  required
                />
                <InputField
                  label="ID Number"
                  value={formData.guarantor1.id}
                  onChange={(value) => 
                    setFormData(prev => ({ 
                      ...prev, 
                      guarantor1: { ...prev.guarantor1, id: value }
                    }))
                  }
                  placeholder="Enter ID number"
                  icon={<FileText size={16} color={colors.textSecondary} />}
                  required
                />
                <InputField
                  label="Contact"
                  value={formData.guarantor1.contact}
                  onChange={(value) => 
                    setFormData(prev => ({ 
                      ...prev, 
                      guarantor1: { ...prev.guarantor1, contact: value }
                    }))
                  }
                  placeholder="Enter phone number"
                  icon={<Phone size={16} color={colors.textSecondary} />}
                  type="tel"
                  required
                />
              </div>
            </div>

            {/* Guarantor 2 */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: colors.text, margin: '0 0 16px' }}>
                Guarantor 2
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <InputField
                  label="Full Name"
                  value={formData.guarantor2.name}
                  onChange={(value) => 
                    setFormData(prev => ({ 
                      ...prev, 
                      guarantor2: { ...prev.guarantor2, name: value }
                    }))
                  }
                  placeholder="Enter full name"
                  icon={<User size={16} color={colors.textSecondary} />}
                  required
                />
                <InputField
                  label="ID Number"
                  value={formData.guarantor2.id}
                  onChange={(value) => 
                    setFormData(prev => ({ 
                      ...prev, 
                      guarantor2: { ...prev.guarantor2, id: value }
                    }))
                  }
                  placeholder="Enter ID number"
                  icon={<FileText size={16} color={colors.textSecondary} />}
                  required
                />
                <InputField
                  label="Contact"
                  value={formData.guarantor2.contact}
                  onChange={(value) => 
                    setFormData(prev => ({ 
                      ...prev, 
                      guarantor2: { ...prev.guarantor2, contact: value }
                    }))
                  }
                  placeholder="Enter phone number"
                  icon={<Phone size={16} color={colors.textSecondary} />}
                  type="tel"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            style={styles.submitButton}
            onClick={() => setCurrentScreen('pending')}
            onMouseEnter={(e) => {
              e.target.style.background = colors.primaryLight;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = colors.primary;
            }}
          >
            Submit Loan Request
          </button>
        </div>
      </div>
    );
  };

  // Formal Form Screen
  const FormalFormScreen = () => (
    <div style={styles.screen}>
      <Header 
        title="Formal Sector Loan Request" 
        showBack={true}
        onBack={() => setCurrentScreen('home')}
      />
      <ProgressBar currentStep={2} totalSteps={4} />
      
      <div style={styles.formContent}>
        {/* Document Upload Section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Required Documents</h3>
          
          <UploadButton 
            title="Upload 6 Months Bank Statements" 
            onClick={() => alert('Bank statements upload feature')}
          />
          
          <UploadButton 
            title="Upload 6 Months Salary Payslips" 
            onClick={() => alert('Payslips upload feature')}
          />
        </div>

        {/* Permissions Section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Permissions</h3>
          <div style={styles.permissionRow}>
            <div style={styles.permissionInfo}>
              <span style={styles.permissionLabel}>
                Allow access to messages and call logs
              </span>
              <p style={styles.permissionSubtext}>
                Used for verification purposes only
              </p>
            </div>
            <ToggleSwitch
              checked={formData.allowPermissions}
              onChange={(value) => 
                setFormData(prev => ({ ...prev, allowPermissions: value }))
              }
            />
          </div>
        </div>

        {/* Loan Details */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Loan Details</h3>
          
          <InputField
            label="Amount Requested"
            value={formData.amount}
            onChange={(value) => setFormData(prev => ({ ...prev, amount: value }))}
            placeholder="Enter amount"
            icon={<DollarSign size={16} color={colors.textSecondary} />}
            type="number"
            required
          />

          <InputField
            label="Repayment Date"
            value={formData.repaymentDate}
            onChange={(value) => setFormData(prev => ({ ...prev, repaymentDate: value }))}
            placeholder="Select date"
            icon={<Calendar size={16} color={colors.textSecondary} />}
            type="date"
            required
          />

          <UploadButton 
            title="Upload Proof of Illness" 
            onClick={() => alert('Document upload feature')}
          />
        </div>

        {/* Business Section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Business Information</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ToggleSwitch
              checked={formData.hasRetailBusiness}
              onChange={(value) => 
                setFormData(prev => ({ ...prev, hasRetailBusiness: value }))
              }
            />
            <span style={{ fontSize: '16px', color: colors.text }}>
              Do you own a retail business?
            </span>
          </div>

          {formData.hasRetailBusiness && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
              <InputField
                label="Business Registration Number"
                value={formData.businessRegNumber}
                onChange={(value) => setFormData(prev => ({ ...prev, businessRegNumber: value }))}
                placeholder="Enter registration number"
                icon={<Building2 size={16} color={colors.textSecondary} />}
              />

              <InputField
                label="Business Location"
                value={formData.businessLocation}
                onChange={(value) => setFormData(prev => ({ ...prev, businessLocation: value }))}
                placeholder="Enter business address"
                icon={<MapPin size={16} color={colors.textSecondary} />}
              />

              <UploadButton 
                title="Upload Shop Picture" 
                onClick={() => alert('Shop photo upload feature')}
              />
            </div>
          )}
        </div>

        {/* Guarantors Section - Same as Informal */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Guarantors</h3>
          
          {/* Guarantor 1 */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '18px', fontWeight: '600', color: colors.text, margin: '0 0 16px' }}>
              Guarantor 1
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <InputField
                label="Full Name"
                value={formData.guarantor1.name}
                onChange={(value) => 
                  setFormData(prev => ({ 
                    ...prev, 
                    guarantor1: { ...prev.guarantor1, name: value }
                  }))
                }
                placeholder="Enter full name"
                icon={<User size={16} color={colors.textSecondary} />}
                required
              />
              <InputField
                label="ID Number"
                value={formData.guarantor1.id}
                onChange={(value) => 
                  setFormData(prev => ({ 
                    ...prev, 
                    guarantor1: { ...prev.guarantor1, id: value }
                  }))
                }
                placeholder="Enter ID number"
                icon={<FileText size={16} color={colors.textSecondary} />}
                required
              />
              <InputField
                label="Contact"
                value={formData.guarantor1.contact}
                onChange={(value) => 
                  setFormData(prev => ({ 
                    ...prev, 
                    guarantor1: { ...prev.guarantor1, contact: value }
                  }))
                }
                placeholder="Enter phone number"
                icon={<Phone size={16} color={colors.textSecondary} />}
                type="tel"
                required
              />
            </div>
          </div>

          {/* Guarantor 2 */}
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: '600', color: colors.text, margin: '0 0 16px' }}>
              Guarantor 2
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <InputField
                label="Full Name"
                value={formData.guarantor2.name}
                onChange={(value) => 
                  setFormData(prev => ({ 
                    ...prev, 
                    guarantor2: { ...prev.guarantor2, name: value }
                  }))
                }
                placeholder="Enter full name"
                icon={<User size={16} color={colors.textSecondary} />}
                required
              />
              <InputField
                label="ID Number"
                value={formData.guarantor2.id}
                onChange={(value) => 
                  setFormData(prev => ({ 
                    ...prev, 
                    guarantor2: { ...prev.guarantor2, id: value }
                  }))
                }
                placeholder="Enter ID number"
                icon={<FileText size={16} color={colors.textSecondary} />}
                required
              />
              <InputField
                label="Contact"
                value={formData.guarantor2.contact}
                onChange={(value) => 
                  setFormData(prev => ({ 
                    ...prev, 
                    guarantor2: { ...prev.guarantor2, contact: value }
                  }))
                }
                placeholder="Enter phone number"
                icon={<Phone size={16} color={colors.textSecondary} />}
                type="tel"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          style={styles.submitButton}
          onClick={() => setCurrentScreen('pending')}
          onMouseEnter={(e) => {
            e.target.style.background = colors.primaryLight;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = colors.primary;
          }}
        >
          Submit Loan Request
        </button>
      </div>
    </div>
  );

  // Pending Screen
  const PendingScreen = () => (
    <div style={styles.screen}>
      <Header 
        title="Loan Status" 
        showBack={true}
        onBack={() => setCurrentScreen('home')}
      />
      
      <div style={styles.pendingContent}>
        <div style={styles.pendingIcon}>
          <Clock size={60} color={colors.warning} />
        </div>
        
        <h2 style={styles.pendingTitle}>
          Your Loan Request is Being Processed
        </h2>
        
        <div style={styles.statusCard}>
          <div style={styles.statusRow}>
            <span style={styles.statusLabel}>Submission Date:</span>
            <span style={styles.statusValue}>
              {new Date().toLocaleDateString()}
            </span>
          </div>
          
          <div style={styles.statusRow}>
            <span style={styles.statusLabel}>Requested Amount:</span>
            <span style={styles.statusValue}>
              ${formData.amount || '0'}
            </span>
          </div>
          
          <div style={{...styles.statusRow, borderBottom: 'none'}}>
            <span style={styles.statusLabel}>Status:</span>
            <div style={styles.statusBadge}>
              <span>Under Review</span>
            </div>
          </div>
        </div>

        <button
          style={styles.supportButton}
          onClick={() => alert('Contact support feature')}
          onMouseEnter={(e) => {
            e.target.style.background = colors.primary;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = colors.accent;
          }}
        >
          <HelpCircle size={20} />
          <span>Contact Support</span>
        </button>
      </div>
    </div>
  );

  // Main render function
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'informalForm':
        return <InformalFormScreen />;
      case 'formalForm':
        return <FormalFormScreen />;
      case 'pending':
        return <PendingScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div style={styles.app}>
      {renderScreen()}
    </div>
  );
};

export default LoanApp;