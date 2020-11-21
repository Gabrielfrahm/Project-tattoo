import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1592174524277
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'artist');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'artist_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['artist_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'artists',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'artist_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'artist',
        type: 'varchar',
      }),
    );
  }
}
