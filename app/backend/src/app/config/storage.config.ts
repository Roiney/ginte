// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => ({
  midiaBucketName:
    process.env.WAVELIGHT_ANALISYS_BUCKET_NAME ??
    'wavelighttech-video-repository-dev',

  imageBucketName:
    process.env.WAVELIGHT_IMAGE_BUCKET_NAME ?? 'wavelight-image-repository',
});
