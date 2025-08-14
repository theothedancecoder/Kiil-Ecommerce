import { client } from './client'

export interface BrandBanner {
  _id: string
  brandName: string
  slug: {
    current: string
  }
  bannerImage: {
    asset: {
      _ref: string
      _type: string
      url?: string
    }
  }
  title?: string
  subtitle?: string
  isActive: boolean
}

export async function getBrandBanner(brandSlug: string): Promise<BrandBanner | null> {
  try {
    const query = `*[_type == "brandBanner" && slug.current == $brandSlug && isActive == true][0]{
      _id,
      brandName,
      slug,
      bannerImage{
        asset->{
          _ref,
          _type,
          url
        }
      },
      title,
      subtitle,
      isActive
    }`
    
    const banner = await client.fetch(query, { brandSlug })
    return banner
  } catch (error) {
    console.error('Error fetching brand banner:', error)
    return null
  }
}

export async function getAllBrandBanners(): Promise<BrandBanner[]> {
  try {
    const query = `*[_type == "brandBanner" && isActive == true] | order(brandName asc){
      _id,
      brandName,
      slug,
      bannerImage{
        asset->{
          _ref,
          _type,
          url
        }
      },
      title,
      subtitle,
      isActive
    }`
    
    const banners = await client.fetch(query)
    return banners || []
  } catch (error) {
    console.error('Error fetching brand banners:', error)
    return []
  }
}
