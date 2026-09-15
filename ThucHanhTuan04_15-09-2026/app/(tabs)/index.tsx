import NewsFeed from '@/components/Bai9_NewsFeed/news-feed';
import UserDetail from '@/components/Bai10_UserProfile/user-profile-detail';
import ProductSearch from '@/components/Bai11_ProductSearchAPI/product-search';
import ApiErrorHandling from '@/components/Bai12_APIErrorHandling/api-error-handling';
import FilteredList from '@/components/Bai13_Filtered-List-Generic/Filltered';
import Pagination from '@/components/Bai14_Pagination-Response/Pagination';
import ProductList from '@/components/Bai15_Pull-to-Refresh-State/pull-to-refresh';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';

export default function Index() {
  const { width } = useWindowDimensions();
  return (
    <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
      {/* <View style={{ width, flex: 1 }}>
        <Text style={{ padding: 12, fontWeight: 'bold' }}>BookStore - 9: NewsFeed</Text>
        <NewsFeed />
      </View> */}

      {/* <View style={{ width, flex: 1 }}>
        <Text style={{ padding: 12, fontWeight: 'bold' }}>BookStore - 10: UserDetail</Text>
        <UserDetail />
      </View> */}

      {/* <View style={{ width, flex: 1 }}>
        <Text style={{ padding: 12, fontWeight: 'bold' }}>BookStore - 11: ProductSearch</Text>
        <ProductSearch />
      </View> */}

      {/* <View style={{ width, flex: 1 }}>
        <Text style={{ padding: 12, fontWeight: 'bold' }}>BookStore - 12: ApiErrorHandling</Text>
        <ApiErrorHandling />
      </View> */}

      {/* <View style={{ width, flex: 1 }}>
        <Text style={{ padding: 12, fontWeight: 'bold' }}>BookStore - 13: FilteredList</Text>
        <FilteredList />
      </View> */}

      {/* <View style={{ width, flex: 1 }}>
        <Text style={{ padding: 12, fontWeight: 'bold' }}>BookStore - 14: Pagination</Text>
        <Pagination />
      </View> */}

      <View style={{ width, flex: 1 }}>
        <Text style={{ padding: 12, fontWeight: 'bold' }}>BookStore - 15: ProductList</Text>
        <ProductList />
      </View>
    </ScrollView>
  );
}
