export default class Earth {
  constructor( Three, r = 50 ) {
    this.geometry      = new Three.SphereGeometry(r, r, r);
    this.mesh          = new Three.Mesh();
    this.material      = new Three.MeshLambertMaterial();
    this.textureLoader = new Three.TextureLoader();
  }

  textureLoad( path = '/img/earth.jpg', done = () => {}, error = () => {} ) {
    let self = this;
    this.textureLoader.load(
      path,
      ( texture ) => {
        self.material.map = texture;
        self.material.fog = false;
        
        self.mesh.geometry = self.geometry;
        self.mesh.material = self.material;
        done();
      },
      ( error ) => {
        error();
      }
    );
  }
}