import { baseQuery } from "@api/baseQuery";
import { images } from "@assets";
import { Block, GradientButton, HeaderHome, Text, TopNav } from "@components";
import SearchBar from "@components/SearchBar";
import { setUserInfo, setisFromHome } from "@store/slices/user";
import { theme } from "@theme";
import { formatPrice } from "@utils/helper";
import { getSize, width } from "@utils/responsive";
import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useDispatch } from "react-redux";
import { DOMAIN } from "../../../constants";
import CarouselComponent from "./Carousel";
import styles from "./styles";
import { goBack, navigate } from "@navigation/RootNavigation";
import { showAlert } from "@utils/navigator";
import messaging from "@react-native-firebase/messaging";
import { dispatch } from "@store/configStore";
import { setListProduct } from "@store/slices/products";

const menuData = [
  {
    lable: "Cửa hàng",
    icon: images.ic_store,
    navigate: "ProductScreen",
    status: 0,
  },

  {
    lable: "Khuyễn mãi",
    icon: images.ic_coupon,
    navigate: "",
  },
  {
    lable: "Best Seller",
    icon: images.ic_bestSeller,
    navigate: "ProductScreen",
  },
  {
    lable: "Phân bón",
    icon: images.ic_phanBon,
    navigate: "ProductScreen",
    status: 1,
  },
  {
    lable: "Thuốc bảo vệ",
    icon: images.ic_thuocBaoVe,
    navigate: "ProductScreen",
    status: 2,
  },
  {
    lable: "Hỗ trợ",
    icon: images.ic_support,
    navigate: "ChatScreen",
  },
];

const HomeView = ({ navigation }) => {
  const carouselRef = useRef();
  const searchBarRef = useRef();
  const [carouIndex, setcarouIndex] = useState(0);
  const [listBanner, setlistBanner] = useState([]);
  const [CategoryProduct, setCategoryProduct] = useState([]);
  const [newProduct, setnewProduct] = useState([]);
  const [sellingProduct, setsellingProduct] = useState([]);
  const [valueSearch, setvalueSearch] = useState("");
  const dispatch = useDispatch();

  const renderCaroudel = ({ item, index }) => {
    return (
      <Block marginBottom={29} key={index}>
        <Image
          source={images.bg_blur1}
          style={{
            position: "absolute",
            flex: 1,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            width: width - 40,
            height: "83%",
          }}
        />
        <Image
          source={{
            uri: item.product_image?.includes("https://")
              ? item.product_image
              : DOMAIN + item.product_image,
          }}
          style={styles.itemImage}
        />
        <Block width={width - 40} row marginTop={20} paddingHorizontal={10}>
          <Text numberOfLines={2} size={16} flex>
            {item.product_name}
          </Text>
          <GradientButton
            onPress={() => navigate("BuyProducts", { item, index })}
            title={"Mua"}
            style={styles.gradientBg}
          />
        </Block>
      </Block>
    );
  };

  useEffect(async () => {
    searchBarRef.current?.blur();
    getInfo();
    getListBanner();
    getNewProduct();
    getBestSellerProduct();
    baseQuery({
      url: "product/category",
      method: "GET",
    }).then((response) => {
      setCategoryProduct(response.data);
    });
  }, []);

  const getNewProduct = async () => {
    const res = await baseQuery({
      url: "product/list",
      method: "GET",
      query: {
        new: 1,
      },
    });
    setnewProduct(res.data?.data);
  };

  const getBestSellerProduct = async () => {
    const res = await baseQuery({
      url: "product/list",
      method: "GET",
      query: {
        selling: 1,
      },
    });
    setsellingProduct(res.data?.data);
  };

  const getListBanner = async () => {
    const response = await baseQuery({
      url: "banner/list",
    });
    if (response.status && response.data) {
      setlistBanner(response.data);
    }
  };

  const getInfo = async () => {
    const response = await baseQuery({
      url: "user/info",
    });
    dispatch(setUserInfo(response.data));
  };

  const renderMenu = (item, index) => {
    return (
      <Block marginTop={30} width={width / 3} alignCenter key={index}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={
            item?.navigate
              ? () => navigate(item?.navigate, { status: item?.status })
              : commingSoon
          }
        >
          <Image source={item.icon} style={styles.icWallet} />
          <Text marginTop={25}>{item.lable}</Text>
        </TouchableOpacity>
      </Block>
    );
  };
  const renderBanner = ({ item, index }) => {
    return (
      <Block key={index}>
        <Image
          source={{ uri: DOMAIN + item?.banner_image }}
          style={styles.banner}
        />
      </Block>
    );
  };

  const commingSoon = () => {
    showAlert(
      "Thông báo",
      "Tính năng đang được phát triển",
      "Xách nhận",
      "",
      () => goBack()
    );
  };
  return (
    <Block flex backgroundColor={theme.colors.white}>
      <HeaderHome />
      <TopNav />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Block flex>
          <SearchBar
            searchBarRef={searchBarRef}
            valueSearch={valueSearch}
            onFocus={() => {
              searchBarRef.current?.blur();
              navigate("ProductScreen");
            }}
          />

          <Block
            style={styles.shahow}
            alignCenter
            marginHorizontal={20}
            marginTop={30}
            row
            paddingHorizontal={20}
            paddingVertical={10}
            radius={9}
          >
            <Block row alignCenter>
              <Image source={images.ic_plus} />
              <Text
                marginLeft={15}
                fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
              >
                Điểm tích luỹ
              </Text>
            </Block>

            <Block marginLeft={30} alignEnd flex>
              <Text
                color="#10A31E"
                size={18}
                numberOfLines={1}
                fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
              >
                0đ
              </Text>
            </Block>
          </Block>

          <Block
            style={styles.shahow}
            alignCenter
            marginHorizontal={20}
            marginTop={30}
            row
            paddingHorizontal={20}
            paddingVertical={10}
            radius={9}
            space={"between"}
          >
            <TouchableOpacity onPress={commingSoon}>
              <Block alignCenter>
                <Image source={images.ic_wallet} style={styles.icWallet} />
                <Text
                  marginTop={20}
                  fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
                >
                  Tích điểm
                </Text>
              </Block>
            </TouchableOpacity>

            <TouchableOpacity onPress={commingSoon}>
              <Block alignCenter>
                <Image source={images.ic_qr} style={styles.icWallet} />
                <Text
                  marginTop={20}
                  fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
                >
                  Quét mã QR
                </Text>
              </Block>
            </TouchableOpacity>

            <TouchableOpacity onPress={commingSoon}>
              <Block alignCenter>
                <Image source={images.ic_voucher} style={styles.icVoucher} />
                <Text
                  marginTop={20}
                  fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
                >
                  Voucher
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>

          <Block row wrap>
            {menuData.map(renderMenu)}
          </Block>

          <Block
            marginTop={30}
            marginHorizontal={20}
            row
            alignCenter
            space={"between"}
          >
            <Text
              fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
              color="#10A31E"
              size={24}
            >
              Bán chạy nhất
            </Text>

            <Block row alignCenter>
              <TouchableOpacity
                onPress={() => carouselRef.current.prev()}
                style={[
                  styles.pressArrow,
                  { opacity: carouIndex === 0 ? 0.3 : 1 },
                ]}
              >
                <Image source={images.ic_left} style={styles.arrawIcon} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => carouselRef.current.next()}
                style={[
                  styles.pressArrow,
                  {
                    marginLeft: 15,
                    opacity: carouIndex === sellingProduct.length - 1 ? 0.3 : 1,
                  },
                ]}
              >
                <Image source={images.ic_right} style={styles.arrawIcon} />
              </TouchableOpacity>
            </Block>
          </Block>

          <Block
            style={styles.carouselWrap}
            marginTop={10}
            marginHorizontal={20}
          >
            <Carousel
              ref={carouselRef}
              data={sellingProduct}
              height={getSize.v(400)}
              renderItem={renderCaroudel}
              width={width}
              onSnapToItem={(i) => setcarouIndex(i)}
              autoPlay={true}
              scrollAnimationDuration={5000}
              autoplayInterval={4000}
              loop
              style={{ width: width - 40 }}
            />
          </Block>

          <CarouselComponent data={newProduct} />

          {CategoryProduct?.map((item, index) => {
            return (
              <Block marginTop={52} key={index}>
                <Block marginHorizontal={20} row alignCenter space={"between"}>
                  <Text
                    fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
                    color="#10A31E"
                    size={24}
                  >
                    {item?.product_category_name}
                  </Text>
                  <TouchableOpacity onPress={() => navigate("ProductScreen")}>
                    <Block row alignCenter>
                      <Text
                        size={16}
                        fontFamily={theme.fonts.fontFamily.SourceSans3Light}
                      >
                        Xem thêm
                      </Text>

                      <Image
                        source={images.ic_right}
                        style={[styles.icMore, { marginLeft: 10 }]}
                      />
                    </Block>
                  </TouchableOpacity>
                </Block>
                <RenderListProduct data={item} />
              </Block>
            );
          })}

          <Block marginBottom={300} marginTop={50} radius={10}>
            <Carousel
              data={listBanner}
              renderItem={renderBanner}
              width={width}
              autoPlay={true}
              scrollAnimationDuration={5000}
              autoplayInterval={4000}
              loop
              style={{ width: width }}
            />
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

export default HomeView;

function RenderListProduct({ data }) {
  const [dataProduct, setdataProduct] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await baseQuery({
      url: "product/list",
      method: "GET",
      query: {
        category: data?.product_category_id,
      },
    });
    setdataProduct(res.data.data);
  };

  const renderItem = (item, index) => {
    return (
      <Block
        borderTopWidth={index === 0 ? 0 : 1}
        marginTop={index === 0 ? 0 : 30}
        paddingTop={30}
        key={index}
        row
        alignCenter
        borderColor={"#848484"}
        marginHorizontal={20}
      >
        <Image
          style={styles.productImg}
          source={{
            uri: item?.product_image?.includes("https://")
              ? item?.product_image
              : DOMAIN + item?.product_image,
          }}
        />
        <Block height={getSize.v(170)} marginLeft={16} flex space={"between"}>
          <Text
            fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
            numberOfLines={2}
          >
            {item?.product_name}
          </Text>
          <Text numberOfLines={1}>
            Mô tả: {item?.product_short_description}
          </Text>
          <Text numberOfLines={1}>
            Giá:{" "}
            <Text fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}>
              {formatPrice(
                parseInt(item?.product_price?.toString()?.split(".")[0])
              )}{" "}
              Đồng
            </Text>
          </Text>
          <GradientButton
            onPress={() => navigate("BuyProducts", { item, index })}
            style={styles.buyBtn}
            title={"Mua"}
          />
        </Block>
      </Block>
    );
  };
  return <Block>{dataProduct?.map(renderItem)}</Block>;
}
