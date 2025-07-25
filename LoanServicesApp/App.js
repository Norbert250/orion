import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Image,
  Alert,
  Switch,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

const { width, height } = Dimensions.get('window');

const LoanServicesApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showSectorModal, setShowSectorModal] = useState(false);
  const [selectedSector, setSelectedSector] = useState('');
  const [formData, setFormData] = useState({
    amount: '',
    repaymentDate: '',
    hasRetailBusiness: false,
    businessRegNumber: '',
    businessLocation: '',
    guarantor1: { name: '', id: '', contact: '' },
    guarantor2: { name: '', id: '', contact: '' },
    allowPermissions: false,
    uploadedAssets: [],
    uploadedDocuments: [],
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

  // Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    safeArea: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
    },
    headerButton: {
      padding: 8,
      borderRadius: 8,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 20,
    },
    welcomeSection: {
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 40,
    },
    welcomeIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: `${colors.primary}20`,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    welcomeTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    welcomeSubtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
    },
    buttonContainer: {
      paddingHorizontal: 20,
      gap: 16,
    },
    primaryButton: {
      backgroundColor: colors.primary,
      paddingVertical: 18,
      paddingHorizontal: 24,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      elevation: 4,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    secondaryButton: {
      backgroundColor: colors.surface,
      borderWidth: 2,
      borderColor: colors.primary,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: '600',
      color: 'white',
    },
    secondaryButtonText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.primary,
    },
    featuresSection: {
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 8,
    },
    featureText: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    modalContent: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      padding: 24,
      width: '100%',
      maxWidth: 400,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 8,
    },
    modalSubtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 24,
    },
    sectorButton: {
      backgroundColor: colors.background,
      borderWidth: 2,
      borderColor: colors.border,
      padding: 20,
      borderRadius: 16,
      alignItems: 'center',
      marginBottom: 16,
    },
    sectorButtonText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginTop: 8,
      marginBottom: 4,
    },
    sectorButtonSubtext: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    progressContainer: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    progressText: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 8,
    },
    formContent: {
      padding: 20,
      gap: 24,
    },
    section: {
      backgroundColor: colors.surface,
      padding: 20,
      borderRadius: 16,
      gap: 16,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    inputContainer: {
      gap: 8,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
    },
    required: {
      color: colors.error,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 16,
    },
    input: {
      flex: 1,
      paddingVertical: 16,
      fontSize: 16,
      color: colors.text,
    },
    uploadGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 16,
    },
    assetUploadBox: {
      width: (width - 64) / 2,
      height: 100,
      backgroundColor: colors.background,
      borderWidth: 2,
      borderColor: colors.border,
      borderStyle: 'dashed',
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    uploadButton: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 12,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    uploadButtonText: {
      fontSize: 14,
      color: colors.text,
    },
    toggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
    },
    toggleInfo: {
      flex: 1,
    },
    toggleLabel: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
      marginBottom: 4,
    },
    toggleSubtext: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    submitButton: {
      backgroundColor: colors.primary,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center',
    },
    submitButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: 'white',
    },
    pendingContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      gap: 24,
    },
    pendingIcon: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: `${colors.warning}20`,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pendingTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
    },
    statusCard: {
      backgroundColor: colors.surface,
      padding: 20,
      borderRadius: 16,
      width: '100%',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    statusRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    statusLabel: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    statusValue: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
    },
    statusBadge: {
      backgroundColor: `${colors.warning}20`,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    statusBadgeText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.warning,
    },
    supportButton: {
      backgroundColor: colors.accent,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    supportButtonText: {
      fontSize: 16,
      fontWeight: '500',
      color: 'white',
    },
  });

  // Header Component
  const Header = ({ title, showMenu = false, showBack = false, onBack }) => (
    <View style={styles.header}>
      {showBack ? (
        <TouchableOpacity style={styles.headerButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 40 }} />
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      {showMenu ? (
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="menu" size={24} color={colors.text} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 40 }} />
      )}
    </View>
  );

  // Input Field Component
  const InputField = ({ label, value, onChange, placeholder, icon, type = 'default', required = false }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <View style={styles.inputWrapper}>
        {icon && <Ionicons name={icon} size={16} color={colors.textSecondary} />}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          keyboardType={type}
          placeholderTextColor={colors.textSecondary}
        />
      </View>
    </View>
  );

  // Upload Button Component
  const UploadButton = ({ title, onPress, uploaded = false }) => (
    <TouchableOpacity 
      style={[
        styles.uploadButton,
        uploaded && { borderColor: colors.success, backgroundColor: `${colors.success}10` }
      ]}
      onPress={onPress}
    >
      <Ionicons 
        name={uploaded ? "checkmark-circle" : "cloud-upload"} 
        size={20} 
        color={uploaded ? colors.success : colors.primary} 
      />
      <Text style={[
        styles.uploadButtonText,
        uploaded && { color: colors.success }
      ]}>
        {uploaded ? 'Uploaded ✓' : title}
      </Text>
    </TouchableOpacity>
  );

  // Progress Bar Component
  const ProgressBar = ({ currentStep, totalSteps }) => (
    <View style={styles.progressContainer}>
      <Progress.Bar
        progress={currentStep / totalSteps}
        width={width - 40}
        height={4}
        color={colors.primary}
        unfilledColor={colors.border}
        borderWidth={0}
        borderRadius={2}
      />
      <Text style={styles.progressText}>
        Step {currentStep} of {totalSteps}
      </Text>
    </View>
  );

  // Home Screen
  const HomeScreen = () => (
    <View style={styles.container}>
      <Header title="Loan Services" showMenu={true} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeIcon}>
            <Ionicons name="card" size={40} color={colors.primary} />
          </View>
          <Text style={styles.welcomeTitle}>Welcome to Loan Services</Text>
          <Text style={styles.welcomeSubtitle}>
            Quick and reliable financial solutions for your needs
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setShowSectorModal(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="cash" size={24} color="white" />
            <Text style={styles.buttonText}>Request Loan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => Alert.alert('Pay Loan', 'Payment feature coming soon!')}
            activeOpacity={0.8}
          >
            <Ionicons name="card" size={24} color={colors.primary} />
            <Text style={styles.secondaryButtonText}>Pay Loan</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Why Choose Us?</Text>
          <View style={{ gap: 12 }}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.featureText}>Quick approval process</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.featureText}>Flexible repayment options</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.featureText}>Competitive interest rates</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sector Selection Modal */}
      <Modal
        visible={showSectorModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSectorModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}
              onPress={() => setShowSectorModal(false)}
            >
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>Select Your Sector</Text>
            <Text style={styles.modalSubtitle}>
              Are you from the Formal or Informal Sector?
            </Text>

            <TouchableOpacity
              style={styles.sectorButton}
              onPress={() => {
                setSelectedSector('formal');
                setCurrentScreen('formalForm');
                setShowSectorModal(false);
              }}
              activeOpacity={0.8}
            >
              <Ionicons name="briefcase" size={32} color={colors.primary} />
              <Text style={styles.sectorButtonText}>Formal</Text>
              <Text style={styles.sectorButtonSubtext}>
                Employed with regular salary
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sectorButton}
              onPress={() => {
                setSelectedSector('informal');
                setCurrentScreen('informalForm');
                setShowSectorModal(false);
              }}
              activeOpacity={0.8}
            >
              <Ionicons name="storefront" size={32} color={colors.secondary} />
              <Text style={styles.sectorButtonText}>Informal</Text>
              <Text style={styles.sectorButtonSubtext}>
                Self-employed or small business
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );

  // Informal Form Screen
  const InformalFormScreen = () => (
    <View style={styles.container}>
      <Header 
        title="Informal Sector Loan Request" 
        showBack={true}
        onBack={() => setCurrentScreen('home')}
      />
      <ProgressBar currentStep={1} totalSteps={4} />
      
      <ScrollView contentContainerStyle={styles.formContent}>
        {/* Asset Upload Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upload Asset Photos</Text>
          <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 8 }}>
            Upload 3-10 pictures of your most valuable assets
          </Text>
          
          <View style={styles.uploadGrid}>
            {[1, 2, 3, 4].map((i) => (
              <TouchableOpacity 
                key={i} 
                style={styles.assetUploadBox}
                onPress={() => Alert.alert('Upload Asset', `Upload asset ${i} photo`)}
              >
                <Ionicons name="camera" size={24} color={colors.textSecondary} />
                <Text style={{ fontSize: 14, color: colors.textSecondary }}>
                  Asset {i}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <UploadButton 
            title="Upload Home Floor Photo" 
            onPress={() => Alert.alert('Upload', 'Home floor photo upload')}
          />
        </View>

        {/* Permissions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Permissions</Text>
          <View style={styles.toggleContainer}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>
                Allow access to messages and call logs
              </Text>
              <Text style={styles.toggleSubtext}>
                Used for verification purposes only
              </Text>
            </View>
            <Switch
              value={formData.allowPermissions}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, allowPermissions: value }))
              }
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={formData.allowPermissions ? 'white' : colors.textSecondary}
            />
          </View>
        </View>

        {/* Loan Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Loan Details</Text>
          
          <InputField
            label="Amount Requested"
            value={formData.amount}
            onChange={(value) => setFormData(prev => ({ ...prev, amount: value }))}
            placeholder="Enter amount"
            icon="cash"
            type="numeric"
            required
          />

          <InputField
            label="Repayment Date"
            value={formData.repaymentDate}
            onChange={(value) => setFormData(prev => ({ ...prev, repaymentDate: value }))}
            placeholder="Select date"
            icon="calendar"
            required
          />

          <UploadButton 
            title="Upload Proof of Illness" 
            onPress={() => Alert.alert('Upload', 'Proof of illness document')}
          />
        </View>

        {/* Business Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Information</Text>
          
          <View style={styles.toggleContainer}>
            <Text style={{ fontSize: 16, color: colors.text, flex: 1 }}>
              Do you own a retail business?
            </Text>
            <Switch
              value={formData.hasRetailBusiness}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, hasRetailBusiness: value }))
              }
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={formData.hasRetailBusiness ? 'white' : colors.textSecondary}
            />
          </View>

          {formData.hasRetailBusiness && (
            <View style={{ gap: 16, marginTop: 16 }}>
              <InputField
                label="Business Registration Number"
                value={formData.businessRegNumber}
                onChange={(value) => setFormData(prev => ({ ...prev, businessRegNumber: value }))}
                placeholder="Enter registration number"
                icon="business"
              />

              <InputField
                label="Business Location"
                value={formData.businessLocation}
                onChange={(value) => setFormData(prev => ({ ...prev, businessLocation: value }))}
                placeholder="Enter business address"
                icon="location"
              />

              <UploadButton 
                title="Upload Shop Picture" 
                onPress={() => Alert.alert('Upload', 'Shop photo upload')}
              />
            </View>
          )}
        </View>

        {/* Guarantors Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Guarantors</Text>
          
          {/* Guarantor 1 */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 16 }}>
              Guarantor 1
            </Text>
            <View style={{ gap: 16 }}>
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
                icon="person"
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
                icon="card"
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
                icon="call"
                type="phone-pad"
                required
              />
            </View>
          </View>

          {/* Guarantor 2 */}
          <View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 16 }}>
              Guarantor 2
            </Text>
            <View style={{ gap: 16 }}>
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
                icon="person"
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
                icon="card"
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
                icon="call"
                type="phone-pad"
                required
              />
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => setCurrentScreen('pending')}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>Submit Loan Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  // Formal Form Screen
  const FormalFormScreen = () => (
    <View style={styles.container}>
      <Header 
        title="Formal Sector Loan Request" 
        showBack={true}
        onBack={() => setCurrentScreen('home')}
      />
      <ProgressBar currentStep={2} totalSteps={4} />
      
      <ScrollView contentContainerStyle={styles.formContent}>
        {/* Document Upload Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Required Documents</Text>
          
          <UploadButton 
            title="Upload 6 Months Bank Statements" 
            onPress={() => Alert.alert('Upload', 'Bank statements upload')}
          />
          
          <UploadButton 
            title="Upload 6 Months Salary Payslips" 
            onPress={() => Alert.alert('Upload', 'Payslips upload')}
          />
        </View>

        {/* Permissions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Permissions</Text>
          <View style={styles.toggleContainer}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>
                Allow access to messages and call logs
              </Text>
              <Text style={styles.toggleSubtext}>
                Used for verification purposes only
              </Text>
            </View>
            <Switch
              value={formData.allowPermissions}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, allowPermissions: value }))
              }
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={formData.allowPermissions ? 'white' : colors.textSecondary}
            />
          </View>
        </View>

        {/* Loan Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Loan Details</Text>
          
          <InputField
            label="Amount Requested"
            value={formData.amount}
            onChange={(value) => setFormData(prev => ({ ...prev, amount: value }))}
            placeholder="Enter amount"
            icon="cash"
            type="numeric"
            required
          />

          <InputField
            label="Repayment Date"
            value={formData.repaymentDate}
            onChange={(value) => setFormData(prev => ({ ...prev, repaymentDate: value }))}
            placeholder="Select date"
            icon="calendar"
            required
          />

          <UploadButton 
            title="Upload Proof of Illness" 
            onPress={() => Alert.alert('Upload', 'Proof of illness document')}
          />
        </View>

        {/* Business Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Information</Text>
          
          <View style={styles.toggleContainer}>
            <Text style={{ fontSize: 16, color: colors.text, flex: 1 }}>
              Do you own a retail business?
            </Text>
            <Switch
              value={formData.hasRetailBusiness}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, hasRetailBusiness: value }))
              }
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={formData.hasRetailBusiness ? 'white' : colors.textSecondary}
            />
          </View>

          {formData.hasRetailBusiness && (
            <View style={{ gap: 16, marginTop: 16 }}>
              <InputField
                label="Business Registration Number"
                value={formData.businessRegNumber}
                onChange={(value) => setFormData(prev => ({ ...prev, businessRegNumber: value }))}
                placeholder="Enter registration number"
                icon="business"
              />

              <InputField
                label="Business Location"
                value={formData.businessLocation}
                onChange={(value) => setFormData(prev => ({ ...prev, businessLocation: value }))}
                placeholder="Enter business address"
                icon="location"
              />

              <UploadButton 
                title="Upload Shop Picture" 
                onPress={() => Alert.alert('Upload', 'Shop photo upload')}
              />
            </View>
          )}
        </View>

        {/* Guarantors Section - Same as Informal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Guarantors</Text>
          
          {/* Guarantor 1 */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 16 }}>
              Guarantor 1
            </Text>
            <View style={{ gap: 16 }}>
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
                icon="person"
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
                icon="card"
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
                icon="call"
                type="phone-pad"
                required
              />
            </View>
          </View>

          {/* Guarantor 2 */}
          <View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 16 }}>
              Guarantor 2
            </Text>
            <View style={{ gap: 16 }}>
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
                icon="person"
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
                icon="card"
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
                icon="call"
                type="phone-pad"
                required
              />
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => setCurrentScreen('pending')}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>Submit Loan Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  // Pending Screen
  const PendingScreen = () => (
    <View style={styles.container}>
      <Header 
        title="Loan Status" 
        showBack={true}
        onBack={() => setCurrentScreen('home')}
      />
      
      <View style={styles.pendingContent}>
        <View style={styles.pendingIcon}>
          <Ionicons name="time" size={60} color={colors.warning} />
        </View>
        
        <Text style={styles.pendingTitle}>
          Your Loan Request is Being Processed
        </Text>
        
        <View style={styles.statusCard}>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Submission Date:</Text>
            <Text style={styles.statusValue}>
              {new Date().toLocaleDateString()}
            </Text>
          </View>
          
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Requested Amount:</Text>
            <Text style={styles.statusValue}>
              ${formData.amount || '0'}
            </Text>
          </View>
          
          <View style={[styles.statusRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.statusLabel}>Status:</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>Under Review</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.supportButton}
          onPress={() => Alert.alert('Support', 'Contact support feature')}
          activeOpacity={0.8}
        >
          <Ionicons name="help-circle" size={20} color="white" />
          <Text style={styles.supportButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />
      {renderScreen()}
    </SafeAreaView>
  );
};

export default LoanServicesApp;