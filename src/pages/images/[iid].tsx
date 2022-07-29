import { createClient } from '@supabase/supabase-js'
import { GetServerSidePropsContext } from 'next'
import { Container } from '../../components/common/container'
import Layout from '../../components/common/layout'
import { Image as TImage } from '../index'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { iid } = context.query

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )

  const { data } = await supabaseAdmin.from('images').select(`*`).eq('id', iid)

  const image = data && data[0]

  return {
    props: {
      image
    }
  }
}

const ImageInfo = (image: { image: TImage }) => {
  return (
    <Layout>
      <Container>
        <h1>{image.image.name}</h1>
        <img src={image.image.imageSrc} alt="image" />
      </Container>
    </Layout>
  )
}

export default ImageInfo
