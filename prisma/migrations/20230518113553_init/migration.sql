-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "create_date" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "changed_date" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "name" TEXT,
    "city" TEXT,
    "district" TEXT,
    "wish" TEXT,
    "create_date" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "changed_date" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscribe" (
    "id" SERIAL NOT NULL,
    "sms_send" BOOLEAN,
    "sms_date_end" TIMESTAMPTZ,
    "email_send" BOOLEAN,
    "email_date_end" TIMESTAMPTZ,
    "create_date" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "changed_date" TIMESTAMPTZ NOT NULL,
    "client_id" INTEGER NOT NULL,

    CONSTRAINT "subscribe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "client_phone_key" ON "client"("phone");

-- AddForeignKey
ALTER TABLE "subscribe" ADD CONSTRAINT "subscribe_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
