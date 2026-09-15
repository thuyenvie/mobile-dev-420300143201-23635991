import CounterScreen from '@/components/ViDuBoDemSoLuong/Vi-du-dem-so-luong';
import FormNhapHoTen from '@/components/FormNhapHoTen/Form-nhap-ho-ten';
import TimerScreen from '@/components/ViDuDongHoDemGiay/TimerScreen';
import TheoDoiTrangThaiKetNoiGiaLap from '@/components/TheoDoiTrangThaiKetNoiGiaLap/TheoDoiTrangThaiKetNoiGiaLap';
import CheDoSangToi from '@/components/CheDoSangToi/CheDoSangToi';
import ChiaSeThongTinNguoiDung from '@/components/ChiaSeThongTinNguoiDng/ChiaSeThongTinNguoiDung';
import QuanLyGioHang from '@/components/QuanLyGioHang/QuanLyGioHang';
import QuanLyFormDangNhap from '@/components/QuanLyFormDangNhap/QuanLyFormDangNhap';
import TimKiemVaTinhTongSanPham from '@/components/TimKiemVaTinhTongSanPham/TimKiemVaTinhTongSanPham';
import LocDanhSachSanPham from '@/components/LocDanhSachSanPham/LocDanhSachSanPham';
import BaiTongHop from '@/components/BaiTongHop/BaiTongHop';
import { ScrollView, useWindowDimensions, View } from 'react-native';

export default function Index() {
  const { width } = useWindowDimensions();

  return (
    <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
      <View style={{ width, flex: 1 }}>
        <CounterScreen />
      </View>
      <View style={{ width, flex: 1 }}>
        <FormNhapHoTen />
      </View>
      <View style={{ width, flex: 1 }}>
        <TimerScreen />
      </View>
      <View style={{ width, flex: 1 }}>
        <TheoDoiTrangThaiKetNoiGiaLap />
      </View>
      <View style={{ width, flex: 1 }}>
        <CheDoSangToi />
      </View>
      <View style={{ width, flex: 1 }}>
        <ChiaSeThongTinNguoiDung />
      </View>
      <View style={{ width, flex: 1 }}>
        <QuanLyGioHang />
      </View>
      <View style={{ width, flex: 1 }}>
        <QuanLyFormDangNhap />
      </View>
      <View style={{ width, flex: 1 }}>
        <TimKiemVaTinhTongSanPham />
      </View>
      <View style={{ width, flex: 1 }}>
        <LocDanhSachSanPham />
      </View>
      <View style={{ width, flex: 1 }}>
        <BaiTongHop />
      </View>
    </ScrollView>
  );
}
