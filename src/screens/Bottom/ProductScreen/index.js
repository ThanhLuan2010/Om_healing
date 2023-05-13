import { baseQuery } from "@api/baseQuery";
import { images } from "@assets";
import {
  Block,
  DropdowPicker,
  HeaderHome,
  Product,
  SearchBar,
  Text,
  TopNav,
} from "@components";
import { navigate } from "@navigation/RootNavigation";
import {
  productSelect,
  setCategory,
  setListBranch,
  setListProduct,
} from "@store/slices/products";
import { theme } from "@theme";
import { setLoading } from "@utils/navigator";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import TopTab from "./TopTab";
import styles from "./styles";

const dataType = [
  {
    name: "Tất cả",
    id: 0,
  },
  {
    name: "Mới nhất",
    id: 1,
  },
  {
    name: "Bán chạy nhất",
    id: 2,
  },
  {
    name: "Giá cao nhất",
    id: 3,
  },
  {
    name: "Giá thấp nhất",
    id: 4,
  },
];

const ProductScreen = ({ navigation, route }) => {
  const search = route.params?.search;
  const [indexTab, setindexTab] = useState(0);
  const [brand, setbrand] = useState(0);
  const [refreshing, setrefreshing] = useState(false);
  const [valueSearch, setvalueSearch] = useState("");
  const [isLoadmore, setisLoadmore] = useState(false);
  const [canLoadMore, setcanLoadMore] = useState(true);
  const [page, setpage] = useState(1);
  const dispatch = useDispatch();
  const { Listcategory } = useSelector(productSelect);
  const { ListBranch, ListProduct } = useSelector(productSelect);
  useEffect(() => {
    getCategory();
    getBrand();
    getProducs();
    unsubcribe = navigation.addListener("focus", () => {
      if (route.params?.status === 1) {
        setindexTab(1);
        getProducs(null, 1);
      }
      if (route.params?.status === 2) {
        for (let i = 0; i < Listcategory.length; i++) {
          if (
            Listcategory[i].product_category_name === "Thuốc bảo vệ thực vật"
          ) {
            setindexTab(2);
            getProducs(null, 2);
          }
        }
      }
      if (route.params?.status === 0) {
        setindexTab(0);
        getProducs(null, 0);
      }
    });

    return () => {};
  }, []);

  // lấy danh sách thương hiệu
  const getBrand = async () => {
    setLoading(true);
    const response = await baseQuery({
      url: "product/brand",
      method: "GET",
    });
    setLoading(false);
    if (response?.status && response?.data) {
      dispatch(setListBranch(response?.data));
    }
  };

  //lấy danh sách category
  const getCategory = async () => {
    setLoading(true);
    const response = await baseQuery({
      url: "product/category",
      method: "GET",
    });
    setLoading(false);
    if (response?.status && response?.data) {
      dispatch(
        setCategory([
          {
            product_category_id: 0,
            product_category_name: "Tất cả",
            product_category_status: 1,
          },
          ...response.data,
        ])
      );
    }
  };

  //lấy danh sách sản phẩm
  const getProducs = async (
    name = valueSearch,
    category = indexTab,
    brand,
    sort,
    selling,
    neww,
    _page = page,
    isLoad = false
  ) => {
    let query = { page: _page };
    if (category) {
      query.category = category;
    }
    if (name) {
      query.name = name;
    }
    if (brand) {
      query.brand = brand;
    }
    if (sort) {
      query.sort = sort;
    }
    if (selling) {
      query.selling = selling;
    }
    if (neww) {
      query.neww = neww;
    }
    // product/list
    if (!isLoad) {
      setLoading(true);
      setrefreshing(true);
    }
    const response = await baseQuery({
      url: "product/list",
      method: "GET",
      query: query,
    });
    if (response.data?.data < 10) {
      setcanLoadMore(false);
    }
    setLoading(false);
    setrefreshing(false);
    setisLoadmore(false);
    if (response?.status && response?.data) {
      dispatch(setListProduct(response.data));
    }
  };

  const renderProduct = (item, index) => {
    return <Product item={item} index={index} key={index} />;
  };

  const renderEmpty = () => {
    return (
      <Block flex justifyCenter alignCenter>
        <Text
          fontFamily={theme.fonts.fontFamily.SourceSans3Bold}
          color={theme.colors.backgroundInput}
          size={24}
        >
          Danh sách trống
        </Text>
      </Block>
    );
  };

  const onSelectType = (item) => {
    switch (item.id) {
      case 0:
        getProducs("", indexTab, brand, null, null, null, 1);
        setpage(1);
        break;
      case 1:
        getProducs("", indexTab, brand, null, null, 1, 1);
        setpage(1);
        break;
      case 2:
        getProducs("", indexTab, brand, null, 1, null, 1);
        setpage(1);
        break;
      case 3:
        getProducs("", indexTab, brand, 0, null, null, 1);
        setpage(1);
        break;
      case 4:
        getProducs("", indexTab, brand, 1, null, null, 1);
        setpage(1);
        break;
      default:
        break;
    }
  };

  const setValue = (value) => {
    console.log("====value====", value);
    setvalueSearch(value.valueSearch);
    getProducs(value.valueSearch);
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <Block flex backgroundColor={theme.colors.white}>
      <HeaderHome />
      <TopNav />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              getProducs();
            }}
          />
        }
        scrollEventThrottle={400}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            if (canLoadMore) {
              setisLoadmore(true);
              setpage(page + 1);
              getProducs("", indexTab, brand, "", "", "", page + 1, true);
            }
          }
        }}
      >
        <SearchBar
          valueSearch={valueSearch}
          onFocus={() => {
            setvalueSearch("");
            navigate("SearchScreen", { setValue: setValue });
          }}
        />
        <TopTab
          onChangeTab={(id) => {
            setindexTab(id);
            getProducs("", id);
          }}
          indexTab={indexTab}
        />

        <Block marginTop={21} marginHorizontal={20} row>
          <DropdowPicker
            onSelectItem={(item) => {
              getProducs("", indexTab, item.id, null, null, null, 1);
              setpage(1);
              setbrand(item.id);
            }}
            placeholder={"Thương hiệu"}
            data={ListBranch?.map((item) => {
              return {
                name: item?.product_brand_name,
                id: item?.product_brand_id,
              };
            })}
            rightIcon={<Image style={styles.icDown} source={images.ic_down} />}
            containerStyle={[styles.dropdow, { marginRight: 20 }]}
          />
          <DropdowPicker
            onSelectItem={onSelectType}
            placeholder={"Phân loại"}
            rightIcon={
              <Image style={styles.ic_drawer} source={images.ic_drawer} />
            }
            data={dataType}
            containerStyle={styles.dropdow}
          />
        </Block>
        <Block flex marginBottom={150}>
          {ListProduct?.data?.length > 0
            ? ListProduct?.data?.map(renderProduct)
            : renderEmpty()}

          {isLoadmore && (
            <ActivityIndicator color={"#10A31E"} style={{ marginTop: 30 }} />
          )}
        </Block>
      </ScrollView>
    </Block>
  );
};

export default ProductScreen;
