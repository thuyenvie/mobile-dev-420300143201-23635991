import ActionButton from '@/components/ThucHanhTuan01_18-08-2026/ActionButton';
import Header from '@/components/ThucHanhTuan01_18-08-2026/Header';
import InputForm from '@/components/ThucHanhTuan01_18-08-2026/InputForm';
import Title from '@/components/ThucHanhTuan01_18-08-2026/Title';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

type StudentInfo = {
  name: string;
  email: string;
  address: string;
};

const initialProfile: StudentInfo = {
  name: 'Tô Nguyễn An Thuyên',
  email: 'email.12345678@iuh.edu.vn',
  address: '12 Nguyễn Văn Bảo, phường Hạnh Thông, thành phố Hồ Chí Minh',
};

export default function App() {
  const [profile, setProfile] = useState<StudentInfo>(initialProfile);
  // draf lưu thông tin đang sửa dể so với thông tin hiện tại
  const [draft, setDraft] = useState<StudentInfo>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  const hasChanges = JSON.stringify(draft) !== JSON.stringify(profile);

  const handleChange = (field: keyof StudentInfo, value: string) => {
    setDraft((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleEdit = () => {
    if (!isEditing) {
      setDraft(profile);
      setIsEditing(true);
      return;
    }

    if (hasChanges) {
      setProfile(draft);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setDraft(profile);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.information}>
          <Title />
          <Header
            name={profile.name}
            isEditing={isEditing}
            onCancel={handleCancel}
          />
          <InputForm
            form={draft}
            isEditing={isEditing}
            onChange={handleChange}
          />
          <ActionButton
            isEditing={isEditing}
            hasChanges={hasChanges}
            onPress={handleEdit}
            disabled={isEditing && !hasChanges}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  information: {
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
});