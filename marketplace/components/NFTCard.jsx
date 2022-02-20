import React from "react";
import { BiHeart } from "react-icons/bi";
import { SiEthereum } from "react-icons/si";

const style = {
  wrapper: `bg-[#303339] w-[14rem] h-[24rem] my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer drop-shadow-xl`,
  imgContainer: `h-2/3 w-full overflow-hidden flex justify-center items-center`,
  nftImg: `w-full object-cover bg-[#303339]`,
  details: `p-3`,
  info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
  infoLeft: `flex-0.6 flex-wrap`,
  collectionName: `font-semibold text-sm text-[#8a939b]`,
  assetName: `font-bold text-lg mt-2`,
  infoRight: `flex-0.4 text-right`,
  priceTag: `font-semibold text-sm text-[#8a939b]`,
  priceValue: `flex items-center text-xl font-bold mt-2`,
  ethLogo: `h-5 mr-2`,
  likes: `text-[#8a939b] font-bold flex items-center w-full justify-end mt-3`,
  likeIcon: `text-xl mr-2`,
};

const NFTCard = ({ nftItem, listings, onClickBuyNft, onClickSellNft }) => {
  const buyNft = () => {
    onClickBuyNft(nftItem);
  };

  const sellNft = () => {
    onClickSellNft(nftItem);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.imgContainer}>
        <img src={nftItem.image} alt={nftItem.name} className={style.nftImg} />
      </div>
      <div className={style.details}>
        <div className={style.info}>
          <div className={style.infoLeft}>
            <div className={style.collectionName}>{nftItem.name}</div>
            <div className={style.assetName}>#{nftItem.tokenId}</div>
          </div>
          <div className={style.infoRight}>
            <div className={style.priceTag}>Price</div>
            <div className={style.priceValue}>
              <SiEthereum />
              {listings ?? "-"}
            </div>
          </div>
        </div>
        {typeof onClickBuyNft === "function" && (
          <button
            className="w-full bg-pink-500 text-white font-bold py-2 mt-2 px-12 rounded"
            onClick={() => buyNft(nftItem)}
          >
            Buy
          </button>
        )}
        {typeof onClickSellNft === "function" && (
          <button
            className="w-full bg-blue-500 text-white font-bold py-2 mt-2 px-12 rounded"
            onClick={() => sellNft(nftItem)}
          >
            Sell
          </button>
        )}
      </div>
    </div>
  );
};

export default NFTCard;
