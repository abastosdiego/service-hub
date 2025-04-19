import { v4 as uuidv4 } from 'uuid';

export class Offering {
    private constructor(
      private id: string,
      private supplierId: string,
      private name: string,
      private description?: string,
      private price?: number,
      private estimatedDuration?: number,
    ) {}
  
    public static create(
      supplierId: string,
      name: string,
      description?: string,
      price?: number,
      estimatedDuration?: number,
    ): Offering {
      const id = uuidv4();
      return new Offering(id, supplierId, name, description, price, estimatedDuration);
    }
  
    public static populate(
      id: string,
      supplierId: string,
      name: string,
      description?: string,
      price?: number,
      estimatedDuration?: number,
    ): Offering {
      return new Offering(id, supplierId, name, description, price, estimatedDuration);
    }
  
    public getId(): string {
      return this.id;
    }
  
    public getSupplierId(): string {
      return this.supplierId;
    }
  
    public getName(): string {
      return this.name;
    }
  
    public getDescription(): string | undefined {
      return this.description;
    }
  
    public getPrice(): number | undefined {
      return this.price;
    }
  
    public getEstimatedDuration(): number | undefined {
      return this.estimatedDuration;
    }
  }